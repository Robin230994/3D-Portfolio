import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector3 } from "three";
import { useCameraStore } from "../Stores/useCameraStore";
import { useFocusStore } from "../Stores/useFocusStore";
import { CameraInfo } from "../types/GLTypes";
import { cameraPresets } from "../Presets/Presets";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const CAMERA_RETURN_SPEED = 0.01;
const CAMERA_ARRIVAL_EPSILON = 0.01;
const DEG2RAD = Math.PI / 180;

const useCameraMovement = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const currentCameraPlaceKey = useCameraStore((state) => state.currentCameraPlaceKey);
	const currentCameraPlaceInfo = useCameraStore((state) => state.currentCameraPlaceInfo);
	const isDragging = useCameraStore((state) => state.isDragging);
	const userMovedCamera = useCameraStore((state) => state.userMovedCamera);
	const setCameraIsMoving = useCameraStore((state) => state.setCameraIsMoving);
	const setDragging = useCameraStore((state) => state.setDragging);
	const setUserMovedCamera = useCameraStore((state) => state.setUserMovedCamera);

	useEffect(() => {
		setDragging(false);
		setUserMovedCamera(false);
	}, [currentCameraPlaceKey, selectObjectFocus?.name, setDragging, setUserMovedCamera]);

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

		if (!isDragging && !userMovedCamera) moveCamera(preset, pos, target, controls);

		// check if camera is still moving
		const posTarget = new Vector3(...preset.position);

		const isMoving = pos.distanceTo(posTarget) > 0.5;
		setCameraIsMoving(isMoving);
	});

	const moveCamera = (preset: CameraInfo, cameraPos: Vector3, cameraTarget: Vector3, controls: OrbitControlsImpl) => {
		const posTarget = new Vector3(...preset.position);
		const targetTarget = new Vector3(...preset.target);

		const applyOrbitLimits = () => {
			if (preset.hdeg2rad >= 180) {
				controls.minAzimuthAngle = -Infinity;
				controls.maxAzimuthAngle = Infinity;
			} else {
				controls.minAzimuthAngle = (preset.azimuthal - preset.hdeg2rad) * DEG2RAD;
				controls.maxAzimuthAngle = (preset.azimuthal + preset.hdeg2rad) * DEG2RAD;
			}

			controls.minPolarAngle = (preset.polar - preset.vdeg2rad) * DEG2RAD;
			controls.maxPolarAngle = (preset.polar + preset.vdeg2rad) * DEG2RAD;
			controls.enabled = true;
			controls.update();
		};

		const isAlreadyAtTarget = cameraPos.distanceTo(posTarget) < CAMERA_ARRIVAL_EPSILON && cameraTarget.distanceTo(targetTarget) < CAMERA_ARRIVAL_EPSILON;
		if (isAlreadyAtTarget) {
			applyOrbitLimits();
			return;
		}

		// Keep OrbitControls out of the transition so its spherical angle limits cannot
		// force the camera to take the long route around the target.
		controls.enabled = false;
		cameraPos.lerp(posTarget, CAMERA_RETURN_SPEED);
		cameraTarget.lerp(targetTarget, CAMERA_RETURN_SPEED);
		controls.object.lookAt(cameraTarget);

		const hasReachedPosition = cameraPos.distanceTo(posTarget) < CAMERA_ARRIVAL_EPSILON;
		const hasReachedTarget = cameraTarget.distanceTo(targetTarget) < CAMERA_ARRIVAL_EPSILON;
		if (!hasReachedPosition || !hasReachedTarget) return;

		cameraPos.copy(posTarget);
		cameraTarget.copy(targetTarget);
		applyOrbitLimits();
	};
};

export default useCameraMovement;
