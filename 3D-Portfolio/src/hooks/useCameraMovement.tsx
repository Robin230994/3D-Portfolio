import { useFrame, useThree } from "@react-three/fiber";
import { Euler, PerspectiveCamera, Quaternion, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useFocusContext } from "./useFocusContext";
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { Matrix4 } from "three";
import { useCameraContext } from "./useCameraContext";
import { useControls } from "leva";

type CameraInfo = {
	position: [number, number, number];
	target: [number, number, number];
	azimuthal: number;
	polar: number;
	hdeg2rad: number;
	vdeg2rad: number;
};

const cameraPresets: Record<string, CameraInfo> = {
	RoomPointOne: {
		position: [1.6, 1.0, 1.58],
		target: [5.72, -0.89, -0.74],
		azimuthal: -60.25,
		polar: 68.25,
		hdeg2rad: 10,
		vdeg2rad: 5,
	},
	FCBox: {
		position: [0.1, 0.5, -1.2],
		target: [0.1, 0.3, -2.1],
		azimuthal: -10.8,
		polar: 73.2,
		hdeg2rad: 10,
		vdeg2rad: 5,
	},
	Musterbox: {
		position: [-3.7, 0.9, -1.2],
		target: [-3.6, -1, -5],
		azimuthal: -100,
		polar: 80,
		hdeg2rad: 10,
		vdeg2rad: 5,
	},
	OcculusQuest: {
		position: [2.9, 0.7, -0.9],
		target: [2.9, -1.9, -3.5],
		azimuthal: 1.4,
		polar: 59.4,
		hdeg2rad: 0,
		vdeg2rad: 0,
	},
	BambuLab: {
		position: [-3.7, 0.4, -0.5],
		target: [-3.8, -2, 10],
		azimuthal: -100,
		polar: 80,
		hdeg2rad: 10,
		vdeg2rad: 5,
	},
	Macbook: {
		position: [5.2, 0.1, -1],
		target: [5.15, -4, -10],
		azimuthal: 0,
		polar: 68.3,
		hdeg2rad: 0,
		vdeg2rad: 0,
	},
	BillardTriangle: {
		position: [-5.5, 1, -2.1],
		target: [-30.7, -5, -3],
		azimuthal: -100,
		polar: 80,
		hdeg2rad: 10,
		vdeg2rad: 5,
	},
};

const CAMERA_MOVEMENT_SPEED = 0.03;
const DEG2RAD = Math.PI / 180;

const useCameraMovement = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const [currentPlaceInfo, setCurrentPlaceInfo] = useState<CameraInfo>(cameraPresets.RoomPointOne);
	const { selectObjectFocus } = useFocusContext();
	const { invalidate } = useThree();

	const { cameraPos, cameraTarget, cameraAzimuthal, cameraPolar, hdeg, vdeg } = useControls("CameraControls", {
		cameraPos: { value: { x: 1.6, y: 1.0, z: 1.58 }, step: 0.1 },
		cameraTarget: { value: { x: 5.72, y: -0.89, z: -0.74 }, step: 0.1 },
		cameraAzimuthal: { value: -60.25, step: 0.1 },
		cameraPolar: { value: 68.25, step: 0.1 },
		hdeg: { value: 10, step: 1 },
		vdeg: { value: 5, step: 1 },
	});

	useEffect(() => {
		if (controlsRef.current) {
			controlsRef.current.object.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
			controlsRef.current.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
			controlsRef.current.minAzimuthAngle = cameraAzimuthal * DEG2RAD - hdeg * DEG2RAD;
			controlsRef.current.maxAzimuthAngle = cameraAzimuthal * DEG2RAD + hdeg * DEG2RAD;
			controlsRef.current.minPolarAngle = cameraPolar * DEG2RAD - vdeg * DEG2RAD;
			controlsRef.current.maxPolarAngle = cameraPolar * DEG2RAD + vdeg * DEG2RAD;
			controlsRef.current.update();
		}
	}, [cameraAzimuthal, cameraPolar, cameraPos, cameraTarget, controlsRef, hdeg, vdeg]);

	useFrame(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const pos = controls.object.position;
		const target = controls.target;

		console.log(
			"Camera position:",
			pos.toArray().map((v) => v.toFixed(2))
		);
		console.log(
			"Camera target:",
			target.toArray().map((v) => v.toFixed(2))
		);
		console.log("Azimuthal:", ((controls.getAzimuthalAngle() * 180) / Math.PI).toFixed(2));
		console.log("Polar:", ((controls.getPolarAngle() * 180) / Math.PI).toFixed(2));

		let preset: CameraInfo | null = null;

		if (selectObjectFocus) {
			preset = cameraPresets[selectObjectFocus.name];
		} else {
			preset = currentPlaceInfo;
		}

		if (!preset) return;

		// Desired targets
		const posTarget = new Vector3(...preset.position);
		const targetTarget = new Vector3(...preset.target);

		// Interpolate position + target
		pos.lerp(posTarget, CAMERA_MOVEMENT_SPEED);
		target.lerp(targetTarget, CAMERA_MOVEMENT_SPEED);

		// Desired angles (in radians)
		const minAzimuthTarget = (preset.azimuthal - preset.hdeg2rad) * DEG2RAD;
		const maxAzimuthTarget = (preset.azimuthal + preset.hdeg2rad) * DEG2RAD;
		const minPolarTarget = (preset.polar - preset.vdeg2rad) * DEG2RAD;
		const maxPolarTarget = (preset.polar + preset.vdeg2rad) * DEG2RAD;

		// Smoothly interpolate current → target
		controls.minAzimuthAngle = MathUtils.lerp(controls.minAzimuthAngle, minAzimuthTarget, CAMERA_MOVEMENT_SPEED);
		controls.maxAzimuthAngle = MathUtils.lerp(controls.maxAzimuthAngle, maxAzimuthTarget, CAMERA_MOVEMENT_SPEED);
		controls.minPolarAngle = MathUtils.lerp(controls.minPolarAngle, minPolarTarget, CAMERA_MOVEMENT_SPEED);
		controls.maxPolarAngle = MathUtils.lerp(controls.maxPolarAngle, maxPolarTarget, CAMERA_MOVEMENT_SPEED);

		controls.update();
		invalidate();
	});
};

export default useCameraMovement;
