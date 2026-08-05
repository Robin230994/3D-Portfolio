import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { MathUtils } from "three";
import { useCameraStore } from "../Stores/useCameraStore";
import { useFocusStore } from "../Stores/useFocusStore";
import { CameraInfo } from "../types/GLTypes";
import { cameraPresets } from "../Presets/Presets";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const CAMERA_MOVEMENT_SPEED = 0.03;
const DEG2RAD = Math.PI / 180;

const useCameraMovement = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const { selectObjectFocus } = useFocusStore();
	const { currentCameraPlaceInfo, edgeHoldTime, isDragging, setCameraIsMoving } = useCameraStore();

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
		if (!isDragging && edgeHoldTime === 0) {
			moveCamera(preset, pos, target, controls);
		}
		// check if camera is still moving
		const posTarget = new Vector3(...preset.position);

		const isMoving = pos.distanceTo(posTarget) > 0.5;
		setCameraIsMoving(isMoving);
	});

	const moveCamera = (preset: CameraInfo, cameraPos: Vector3, cameraTarget: Vector3, controls: OrbitControlsImpl) => {
		// Desired targets
		const posTarget = new Vector3(...preset.position);
		const targetTarget = new Vector3(...preset.target);

		// Interpolate position + target
		cameraPos.lerp(posTarget, CAMERA_MOVEMENT_SPEED);
		cameraTarget.lerp(targetTarget, CAMERA_MOVEMENT_SPEED);

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

		controls.setAzimuthalAngle(preset.azimuthal * DEG2RAD);
		controls.setPolarAngle(preset.polar * DEG2RAD);
	};
};

export default useCameraMovement;
