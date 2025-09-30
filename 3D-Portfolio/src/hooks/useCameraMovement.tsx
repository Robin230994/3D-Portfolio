import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect } from "react";
import { MathUtils } from "three";
import { useControls } from "leva";
import { useCameraStore } from "../Stores/useCameraStore";
import { useObjectInteractionStore } from "../Stores/useObjectInteractionStore";
import { CameraInfo } from "../types/GLTypes";
import { cameraPresets } from "../Presets/Presets";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import useCameraRoomSwitch from "./useCameraRoomSwitch";

const CAMERA_MOVEMENT_SPEED = 0.03;
const DEG2RAD = Math.PI / 180;

const useCameraMovement = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const { selectObjectFocus } = useObjectInteractionStore();
	const { currentCameraPlaceInfo, edgeHoldTime, setCameraIsMoving } = useCameraStore();

	useCameraRoomSwitch(controlsRef);

	const { cameraPos, cameraTarget, cameraAzimuthal, cameraPolar, hdeg, vdeg } = useControls("CameraControls", {
		cameraPos: { value: { x: 1.6, y: 1.0, z: 1.58 }, step: 0.1 },
		cameraTarget: { value: { x: 5.72, y: -0.89, z: -0.74 }, step: 0.1 },
		cameraAzimuthal: { value: -60.25, step: 0.1 },
		cameraPolar: { value: 68.25, step: 0.1 },
		hdeg: { value: 10, step: 1 },
		vdeg: { value: 5, step: 1 },
	});

	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		controls.object.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
		controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
		controls.minAzimuthAngle = cameraAzimuthal * DEG2RAD - hdeg * DEG2RAD;
		controls.maxAzimuthAngle = cameraAzimuthal * DEG2RAD + hdeg * DEG2RAD;
		controls.minPolarAngle = cameraPolar * DEG2RAD - vdeg * DEG2RAD;
		controls.maxPolarAngle = cameraPolar * DEG2RAD + vdeg * DEG2RAD;
		controls.update();
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
			preset = currentCameraPlaceInfo;
		}
		if (!preset) return;

		// dont move camera when user is dragging to move to another position
		if (edgeHoldTime === 0) {
			moveCamera(preset, pos, target, controls);
		}

		// check if camera is still moving
		const posTarget = new Vector3(...preset.position);
		const targetTarget = new Vector3(...preset.target);
		const isMoving = pos.distanceTo(posTarget) > 0.01 || target.distanceTo(targetTarget) > 0.01;
		setCameraIsMoving(isMoving);
		controls.update();
	});

	const moveCamera = (preset: CameraInfo, cameraPos: Vector3, cameraTarget: Vector3, controls: OrbitControlsImpl) => {
		// Desired targets
		const posTarget = new Vector3(...preset.position);
		const targetTarget = new Vector3(...preset.target);

		const SNAP_THRESHOLD = 0.25;

		// Interpolate position + target
		cameraPos.lerp(posTarget, CAMERA_MOVEMENT_SPEED);
		cameraTarget.lerp(targetTarget, CAMERA_MOVEMENT_SPEED);

		// Snap to target if close enough
		if (selectObjectFocus) {
			if (cameraPos.distanceTo(posTarget) < SNAP_THRESHOLD) cameraPos.copy(posTarget);
			if (cameraTarget.distanceTo(targetTarget) < SNAP_THRESHOLD) cameraTarget.copy(targetTarget);
		}

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
	};
};

export default useCameraMovement;
