import { create } from "zustand";
import { CameraInfo } from "../types/GLTypes";
import { cameraPresets } from "../Presets/Presets";

export const ROOM_POSITION_ORDER = ["IntroPoint", "RoomPointOne", "RoomPointTwo", "RoomPointThree"];

interface CameraState {
	currentCameraPlaceKey: string;
	currentCameraPlaceInfo: CameraInfo;
	setCurrentCameraPlace: (place: string) => void;

	cameraIsMoving: boolean;
	setCameraIsMoving: (moving: boolean) => void;

	isDragging: boolean;
	setDragging: (value: boolean) => void;

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
	currentCameraPlaceKey: "IntroPoint",
	currentCameraPlaceInfo: cameraPresets.IntroPoint,
	setCurrentCameraPlace: (key) =>
		set({
			currentCameraPlaceKey: key,
			currentCameraPlaceInfo: cameraPresets[key],
		}),

	// CAMERA MOVEMENT
	cameraIsMoving: false,
	setCameraIsMoving: (moving) => set({ cameraIsMoving: moving }),

	isDragging: false,

	setDragging: (value) =>
		set({
			isDragging: value,
		}),

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
			nextIndex = (roomIndex + 1) % ROOM_POSITION_ORDER.length;
		} else if (edgeSide === "right") {
			nextIndex = (roomIndex - 1 + ROOM_POSITION_ORDER.length) % ROOM_POSITION_ORDER.length;
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
