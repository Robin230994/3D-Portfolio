import { create } from "zustand";
import { CameraInfo } from "../types/GLTypes";
import { cameraPresets } from "../Presets/Presets";

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
}

export const useCameraStore = create<CameraState>((set) => ({
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
}));
