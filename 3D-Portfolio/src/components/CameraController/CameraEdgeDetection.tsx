import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useCameraStore } from "../../Stores/useCameraStore";
import { useObjectInteractionStore } from "../../Stores/useObjectInteractionStore";
import { cameraPresets } from "../../Presets/Presets";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const EDGE_THRESHOLD = 0.05;
const FULL_PUSH_THRESHOLD = 0.01;

const CameraEdgeDetection: React.FC<{ controlsRef: React.RefObject<OrbitControlsImpl>; isDraggingRef: React.RefObject<boolean> }> = ({
	controlsRef,
	isDraggingRef,
}) => {
	const { selectObjectFocus } = useObjectInteractionStore();
	const { setEdgeState, setEdgeHoldTime, edgePulseComplete, setCurrentCameraPlaceInfo } = useCameraStore();
	const holdStartRef = useRef<number | null>(null);

	useEffect(() => {
		if (edgePulseComplete) {
			setCurrentCameraPlaceInfo(cameraPresets.RoomPointTwo);
		}
	}, [edgePulseComplete, setCurrentCameraPlaceInfo]);

	useFrame(() => {
		const controls = controlsRef.current;
		if (!controls || selectObjectFocus) return;

		const pos = controls.object.position;
		if (!cameraIsAtRoom(pos)) return;

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

		if (activeSide && isDraggingRef.current) {
			if (!holdStartRef.current) holdStartRef.current = performance.now();
			setEdgeHoldTime((performance.now() - holdStartRef.current) / 1000);
			setEdgeState(activeSide, pushStrength);
		} else {
			holdStartRef.current = null;
			setEdgeHoldTime(0);
			setEdgeState(null, 0);
		}
	});

	const cameraIsAtRoom = (pos: Vector3) => {
		const threshold = 1.25;
		const rooms = [cameraPresets.RoomPointOne, cameraPresets.RoomPointTwo];
		return rooms.some((r) => pos.distanceTo(new Vector3(...r.position)) <= threshold);
	};

	return null;
};

export default CameraEdgeDetection;
