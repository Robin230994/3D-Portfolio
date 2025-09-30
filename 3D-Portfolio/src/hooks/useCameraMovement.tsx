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

const useCameraMovement = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const [currentPlaceInfo, setCurrentPlaceInfo] = useState<CameraInfo>(cameraPresets.RoomPointOne);

	const { invalidate } = useThree();

	const { selectObjectFocus } = useObjectInteractionStore();
	const { setEdgeState, setCameraIsMoving, setEdgeHoldTime } = useCameraStore();

	const holdStartTimeRef = useRef<number | null>(null);
	const isDraggingRef = useRef<boolean>(false);

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

		const handleStart = () => (isDraggingRef.current = true);
		const handleEnd = () => {
			isDraggingRef.current = false;
			setEdgeState(null, 0); // reset label size immediately on release
			holdStartTimeRef.current = null;
		};

		controls.addEventListener("start", handleStart);
		controls.addEventListener("end", handleEnd);

		return () => {
			controls.removeEventListener("start", handleStart);
			controls.removeEventListener("end", handleEnd);
		};
	}, [cameraAzimuthal, cameraPolar, cameraPos, cameraTarget, controlsRef, hdeg, vdeg, setEdgeState]);

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

		moveCamera(preset, pos, target, controls);

		// check if camera is still moving
		const posTarget = new Vector3(...preset.position);
		const targetTarget = new Vector3(...preset.target);
		const isMoving = pos.distanceTo(posTarget) > 0.01 || target.distanceTo(targetTarget) > 0.01;

		setCameraIsMoving(isMoving);

		// Edge screen detection
		if (!selectObjectFocus && cameraIsAtRoomPosition(pos)) {
			const currentAzimuth = controls.getAzimuthalAngle();

			// soft zone before the edge
			const EDGE_THRESHOLD = 0.05; // start growing label slightly before the edge
			const fullPushThreshold = 0.01; // actual edge for full push

			let pushStrength = 0;
			let activeSide: "left" | "right" | null = null;

			// right edge
			if (currentAzimuth >= controls.maxAzimuthAngle - EDGE_THRESHOLD) {
				const edgeHoldTime = performance.now() / 1000;
				setEdgeHoldTime(edgeHoldTime);
				activeSide = "left";
				pushStrength = Math.min((currentAzimuth - (controls.maxAzimuthAngle - EDGE_THRESHOLD)) / (EDGE_THRESHOLD - fullPushThreshold), 1);
			}

			// left edge
			if (currentAzimuth <= controls.minAzimuthAngle + EDGE_THRESHOLD) {
				activeSide = "right";
				pushStrength = Math.min((controls.minAzimuthAngle + EDGE_THRESHOLD - currentAzimuth) / (EDGE_THRESHOLD - fullPushThreshold), 1);
			}

			// clamp
			pushStrength = Math.max(pushStrength, 0);

			// only grow label if user is dragging
			if (activeSide && isDraggingRef.current) {
				if (!holdStartTimeRef.current) holdStartTimeRef.current = performance.now();
				const elapsed = (performance.now() - holdStartTimeRef.current) / 1000; // seconds
				setEdgeHoldTime(elapsed);
				setEdgeState(activeSide, pushStrength);

				if (pushStrength >= 1) {
					// trigger camera change
				}
			} else {
				holdStartTimeRef.current = null;
				setEdgeHoldTime(0);
				setEdgeState(null, 0);
			}
		}

		controls.update();
		invalidate();
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

	const cameraIsAtRoomPosition = (cameraPos: Vector3): boolean => {
		// threshold acts as a puffer. The User can rotate the camera due to orbit controls.
		// While doing that he is still at room position but the distanceTo function return a higher value
		const threshold = 1.25;
		const roomPositions = [cameraPresets.RoomPointOne];
		for (const roomPosition of roomPositions) {
			if (cameraPos.distanceTo(new Vector3(...roomPosition.position)) <= threshold) {
				return true;
			}
		}

		return false;
	};
};

export default useCameraMovement;
