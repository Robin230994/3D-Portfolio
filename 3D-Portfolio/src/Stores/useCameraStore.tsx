import { create } from "zustand";
import { CameraInfo } from "../types/GLTypes";
import { cameraPresets } from "../Presets/Presets";

export const ROOM_POSITION_ORDER = ["RoomPointOne", "RoomPointTwo", "RoomPointThree"];

interface CameraState {
	currentCameraPlaceKey: string;
	currentCameraPlaceInfo: CameraInfo;
	setCurrentCameraPlace: (place: string) => void;

	cameraIsMoving: boolean;
	setCameraIsMoving: (moving: boolean) => void;

	edgeSide: "left" | "right" | null;
	edgeProgress: number;
	setEdgeState: (side: "left" | "right" | null, progress: number) => void;

	edgeHoldTime: number;
	setEdgeHoldTime: (time: number) => void;

	edgePulseComplete: boolean;
	setEdgePulseComplete: (complete: boolean) => void;

	setNextRoomFromEdge: () => void;
}

export const useCameraStore = create<CameraState>((set, get) => ({
	currentCameraPlaceKey: "RoomPointOne",
	currentCameraPlaceInfo: cameraPresets.RoomPointOne,
	setCurrentCameraPlace: (key) =>
		set({
			currentCameraPlaceKey: key,
			currentCameraPlaceInfo: cameraPresets[key],
		}),

	// CAMERA MOVEMENT
	cameraIsMoving: false,
	setCameraIsMoving: (moving) => set({ cameraIsMoving: moving }),

	// EDGE LABEL STATE
	edgeSide: null,
	edgeProgress: 0,
	setEdgeState: (side, progress) => set({ edgeSide: side, edgeProgress: progress }),

	edgeHoldTime: 0,
	setEdgeHoldTime: (time) => set({ edgeHoldTime: time }),

	edgePulseComplete: false,
	setEdgePulseComplete: (complete) => set({ edgePulseComplete: complete }),

	setNextRoomFromEdge: () => {
		const { currentCameraPlaceKey, edgeSide } = get();

		if (!edgeSide) return;

		const roomIndex = ROOM_POSITION_ORDER.indexOf(currentCameraPlaceKey);
		let nextIndex = roomIndex;

		if (edgeSide === "left") {
			nextIndex = Math.min(ROOM_POSITION_ORDER.length - 1, roomIndex + 1);
		} else if (edgeSide === "right") {
			nextIndex = Math.max(0, roomIndex - 1);
		}

		const nextKey = ROOM_POSITION_ORDER[nextIndex];

		set({
			currentCameraPlaceKey: nextKey,
			currentCameraPlaceInfo: cameraPresets[nextKey],
			edgePulseComplete: false,
			edgeHoldTime: 0,
			edgeSide: null,
			edgeProgress: 0,
		});
	},
}));
