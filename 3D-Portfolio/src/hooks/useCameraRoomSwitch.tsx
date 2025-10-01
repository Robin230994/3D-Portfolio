import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ROOM_POSITION_ORDER, useCameraStore } from "../Stores/useCameraStore";
import { useEffect, useRef } from "react";
import { cameraPresets } from "../Presets/Presets";
import { Vector3 } from "three";
import { useObjectInteractionStore } from "../Stores/useObjectInteractionStore";
import { useFrame } from "@react-three/fiber";

const EDGE_THRESHOLD = 0.1; // soft zone before the edge. start growing label slightly before the edge
const FULL_PUSH_THRESHOLD = 0.01; // actual edge for full push

const useCameraRoomSwitch = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const { edgePulseComplete, setEdgeState, setEdgeHoldTime, setEdgePulseComplete, setNextRoomFromEdge } = useCameraStore();
	const { selectObjectFocus } = useObjectInteractionStore();

	const isDraggingRef = useRef(false);
	const holdStartTimeRef = useRef<number | null>(null);

	useEffect(() => {
		if (!controlsRef.current) return;
		const controls = controlsRef.current;

		const handleStart = () => (isDraggingRef.current = true);
		const handleEnd = () => {
			isDraggingRef.current = false;
			setEdgeState(null, 0);
			holdStartTimeRef.current = null;
		};

		if (edgePulseComplete) {
			isDraggingRef.current = false;
			setEdgePulseComplete(false);
			setNextRoomFromEdge();
		}

		controls.addEventListener("start", handleStart);
		controls.addEventListener("end", handleEnd);

		return () => {
			controls.removeEventListener("start", handleStart);
			controls.removeEventListener("end", handleEnd);
		};
	}, [controlsRef, edgePulseComplete, setEdgePulseComplete, setEdgeState, setNextRoomFromEdge]);

	useFrame(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const pos = controls.object.position;

		cameraOnEdgeDetection(pos, controls);
		controls.update();
	});

	const cameraIsAtRoomPosition = (cameraPos: Vector3) => {
		for (const key of ROOM_POSITION_ORDER) {
			const preset = cameraPresets[key];
			if (!preset) continue;

			const target = new Vector3(...preset.target);
			const presetRadius = new Vector3(...preset.position).distanceTo(target);
			const camRadius = cameraPos.distanceTo(target);

			const radiusThreshold = 0.1;
			if (Math.abs(camRadius - presetRadius) <= radiusThreshold) return true;
		}
		return false;
	};

	const cameraOnEdgeDetection = (pos: Vector3, controls: OrbitControlsImpl) => {
		if (!selectObjectFocus && cameraIsAtRoomPosition(pos)) {
			const currentAzimuth = controls.getAzimuthalAngle();

			let pushStrength = 0;
			let activeSide: "left" | "right" | null = null;

			if (currentAzimuth >= controls.maxAzimuthAngle - EDGE_THRESHOLD) {
				activeSide = "left";
				pushStrength = Math.min((currentAzimuth - (controls.maxAzimuthAngle - EDGE_THRESHOLD)) / (EDGE_THRESHOLD - FULL_PUSH_THRESHOLD), 1);
			}
			if (currentAzimuth <= controls.minAzimuthAngle + EDGE_THRESHOLD) {
				activeSide = "right";
				pushStrength = Math.min((controls.minAzimuthAngle + EDGE_THRESHOLD - currentAzimuth) / (EDGE_THRESHOLD - FULL_PUSH_THRESHOLD), 1);
			}

			pushStrength = Math.max(pushStrength, 0);

			if (activeSide && isDraggingRef.current && !edgePulseComplete) {
				if (!holdStartTimeRef.current) holdStartTimeRef.current = performance.now();
				const elapsed = (performance.now() - holdStartTimeRef.current) / 1000;
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
