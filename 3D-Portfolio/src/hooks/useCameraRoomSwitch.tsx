import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCameraStore } from "../Stores/useCameraStore";
import { useEffect, useRef } from "react";
import { cameraPresets } from "../Presets/Presets";
import { Vector3 } from "three";
import { useObjectInteractionStore } from "../Stores/useObjectInteractionStore";
import { useFrame } from "@react-three/fiber";

const useCameraRoomSwitch = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const { edgePulseComplete, setCurrentCameraPlaceInfo, setEdgeState, setEdgeHoldTime } = useCameraStore();
	const { selectObjectFocus } = useObjectInteractionStore();

	const isDraggingRef = useRef<boolean>(false);
	const holdStartTimeRef = useRef<number | null>(null);

	useEffect(() => {
		if (!controlsRef.current) return;
		const controls = controlsRef.current;

		const handleStart = () => (isDraggingRef.current = true);
		const handleEnd = () => {
			isDraggingRef.current = false;
			setEdgeState(null, 0); // reset label size immediately on release
			holdStartTimeRef.current = null;
		};

		controls.addEventListener("start", handleStart);
		controls.addEventListener("end", handleEnd);

		if (edgePulseComplete) {
			setCurrentCameraPlaceInfo(cameraPresets.RoomPointTwo);
		}

		return () => {
			controls.removeEventListener("start", handleStart);
			controls.removeEventListener("end", handleEnd);
		};
	}, [controlsRef, edgePulseComplete, setCurrentCameraPlaceInfo, setEdgeState]);

	useFrame(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const pos = controls.object.position;

		cameraOnEdgeDetection(pos, controls);
		controls.update();
	});

	const cameraIsAtRoomPosition = (cameraPos: Vector3): boolean => {
		// threshold acts as a puffer. The User can rotate the camera due to orbit controls.
		// While doing that he is still at room position but the distanceTo function return a higher value
		const threshold = 1.25;
		const roomPositions = [cameraPresets.RoomPointOne, cameraPresets.RoomPointTwo];
		for (const roomPosition of roomPositions) {
			if (cameraPos.distanceTo(new Vector3(...roomPosition.position)) <= threshold) {
				return true;
			}
		}

		return false;
	};

	const cameraOnEdgeDetection = (pos: Vector3, controls: OrbitControlsImpl) => {
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
			} else {
				holdStartTimeRef.current = null;
				setEdgeHoldTime(0);
				setEdgeState(null, 0);
			}
		}
	};
};

export default useCameraRoomSwitch;
