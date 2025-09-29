import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { useControls } from "leva";
import { useCameraStore } from "../Stores/useCameraStore";
import { useObjectInteractionStore } from "../Stores/useObjectInteractionStore";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

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
		target: [5.72, -0.3, -0.74],
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
		polar: 51.4,
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
		position: [5.1, 0, -1],
		target: [5.3, -4, -10],
		azimuthal: -1,
		polar: 64.8,
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
const EDGE_HOLD_TIME = 1.5;

const useCameraMovement = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const [currentPlaceInfo, setCurrentPlaceInfo] = useState<CameraInfo>(cameraPresets.RoomPointOne);
	const holdStartTimeRef = useRef<number | null>(null);
	const { invalidate } = useThree();
	const { selectObjectFocus } = useObjectInteractionStore();
	const { setEdgeState } = useCameraStore();

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

		// Edge screen detection
		const currentAzimuth = controls.getAzimuthalAngle();
		const atLeftEdge = Math.abs(currentAzimuth - controls.minAzimuthAngle) < 0.001;
		const atRightEdge = Math.abs(currentAzimuth - controls.maxAzimuthAngle) < 0.001;

		let activeSide: "left" | "right" | null = null;

		if (atRightEdge) activeSide = "left";
		else if (atLeftEdge) activeSide = "right";

		if (activeSide) {
			if (!holdStartTimeRef.current) holdStartTimeRef.current = performance.now();

			const elapsed = (performance.now() - holdStartTimeRef.current) / 1000;
			const progress = Math.min(elapsed / EDGE_HOLD_TIME, 1);

			setEdgeState(activeSide, progress);

			if (progress === 1) {
				holdStartTimeRef.current = null;
				// trigger camera change here
			}
		} else {
			// user left the edge → reset
			holdStartTimeRef.current = null;
			setEdgeState(null, 0);
		}

		controls.update();
		invalidate();
	});
};

export default useCameraMovement;
