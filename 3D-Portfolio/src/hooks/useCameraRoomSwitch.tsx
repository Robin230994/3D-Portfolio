import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCameraStore } from "../Stores/useCameraStore";
import { useEffect, useRef } from "react";
import { cameraPresets } from "../Presets/Presets";
import { Vector3 } from "three";
import { useObjectInteractionStore } from "../Stores/useObjectInteractionStore";
import { useFrame } from "@react-three/fiber";

const EDGE_THRESHOLD = 0.1; // soft zone before the edge. start growing label slightly before the edge
const FULL_PUSH_THRESHOLD = 0.01; // actual edge for full push
const DEG2RAD = Math.PI / 180;

const ROOM_POSITION_ORDER = ["RoomPointOne", "RoomPointTwo", "RoomPointThree"];

const useCameraRoomSwitch = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const { currentCameraPlaceKey, edgeSide, edgePulseComplete, setCurrentCameraPlace, setEdgeState, setEdgeHoldTime, setEdgePulseComplete } = useCameraStore();
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

		return () => {
			controls.removeEventListener("start", handleStart);
			controls.removeEventListener("end", handleEnd);
		};
	}, [controlsRef, setEdgeState]);

	useEffect(() => {
		if (edgePulseComplete && edgeSide) {
			// get the next room index

			const roomIndex = ROOM_POSITION_ORDER.indexOf(currentCameraPlaceKey);
			let nextIndex = roomIndex;

			if (edgeSide === "left") {
				nextIndex = Math.min(ROOM_POSITION_ORDER.length - 1, roomIndex + 1);
			} else if (edgeSide === "right") {
				nextIndex = Math.max(0, roomIndex - 1);
			}

			const nextRoomPosition = ROOM_POSITION_ORDER[nextIndex];
			setCurrentCameraPlace(nextRoomPosition);
			setEdgePulseComplete(false);
		}
	}, [currentCameraPlaceKey, edgePulseComplete, edgeSide, setCurrentCameraPlace, setEdgePulseComplete]);

	useFrame(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const pos = controls.object.position;

		cameraOnEdgeDetection(pos, controls);
		controls.update();
	});

	const cameraIsAtRoomPosition = (cameraPos: Vector3): boolean => {
		for (const key of ROOM_POSITION_ORDER) {
			const preset = cameraPresets[key];
			if (!preset) continue;

			const target = new Vector3(...preset.target);
			const presetRadius = new Vector3(...preset.position).distanceTo(target);
			const camRadius = cameraPos.distanceTo(target);

			// allow orbit around target
			const radiusThreshold = 0.1; // adjust based on room scale
			if (Math.abs(camRadius - presetRadius) > radiusThreshold) return true;
		}

		return false;
	};

	const cameraOnEdgeDetection = (pos: Vector3, controls: OrbitControlsImpl) => {
		// Edge screen detection
		console.log(cameraIsAtRoomPosition(pos));
		if (!selectObjectFocus && cameraIsAtRoomPosition(pos)) {
			const currentAzimuth = controls.getAzimuthalAngle();

			let pushStrength = 0;
			let activeSide: "left" | "right" | null = null;

			// right edge
			if (currentAzimuth >= controls.maxAzimuthAngle - EDGE_THRESHOLD) {
				activeSide = "left";
				pushStrength = Math.min((currentAzimuth - (controls.maxAzimuthAngle - EDGE_THRESHOLD)) / (EDGE_THRESHOLD - FULL_PUSH_THRESHOLD), 1);
			}
			// left edge
			if (currentAzimuth <= controls.minAzimuthAngle + EDGE_THRESHOLD) {
				activeSide = "right";
				pushStrength = Math.min((controls.minAzimuthAngle + EDGE_THRESHOLD - currentAzimuth) / (EDGE_THRESHOLD - FULL_PUSH_THRESHOLD), 1);
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
