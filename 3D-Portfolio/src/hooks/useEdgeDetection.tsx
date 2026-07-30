import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCameraStore } from "../Stores/useCameraStore";
import { useEffect, useRef } from "react";
import { useObjectInteractionStore } from "../Stores/useObjectInteractionStore";
import { useFrame } from "@react-three/fiber";

const EDGE_THRESHOLD = 0.1; // soft zone before the edge. start growing label slightly before the edge
const FULL_PUSH_THRESHOLD = 0.01; // actual edge for full push

const useEdgeDetection = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const { edgePulseComplete, isDragging, setEdgeState, setEdgeHoldTime, setEdgePulseComplete, setNextRoomFromEdge } = useCameraStore();
	const { selectObjectFocus } = useObjectInteractionStore();

	const holdStart = useRef<number | null>(null);

	useEffect(() => {
		if (edgePulseComplete) {
			setEdgePulseComplete(false);
			setNextRoomFromEdge();
		}
	}, [edgePulseComplete, setNextRoomFromEdge, setEdgePulseComplete]);

	useFrame(() => {
		const controls = controlsRef.current;
		if (!controls || selectObjectFocus !== null) return;

		const current = controls.getAzimuthalAngle();

		let side: null | "left" | "right" = null;

		let strength = 0;

		if (current >= controls.maxAzimuthAngle - EDGE_THRESHOLD) {
			side = "left";
			strength = Math.min((current - (controls.maxAzimuthAngle - EDGE_THRESHOLD)) / (EDGE_THRESHOLD - FULL_PUSH_THRESHOLD), 1);
		}

		if (current <= controls.minAzimuthAngle + EDGE_THRESHOLD) {
			side = "right";
			strength = Math.min((controls.minAzimuthAngle + EDGE_THRESHOLD - current) / (EDGE_THRESHOLD - FULL_PUSH_THRESHOLD), 1);
		}

		strength = Math.max(strength, 0);

		if (side && isDragging && !edgePulseComplete) {
			if (!holdStart.current) holdStart.current = performance.now();

			const elapsed = (performance.now() - holdStart.current) / 1000;

			setEdgeHoldTime(elapsed);
			setEdgeState(side, strength);
		} else {
			holdStart.current = null;
			setEdgeHoldTime(0);
			setEdgeState(null, 0);
		}
	});
};

export default useEdgeDetection;
