import { create } from "zustand";

interface CameraState {
	cameraIsMoving: boolean;
	setCameraIsMoving: (moving: boolean) => void;

	edgeSide: "left" | "right" | null;
	edgeProgress: number;
	setEdgeState: (side: "left" | "right" | null, progress: number) => void;

	edgeHoldTime: number;
	setEdgeHoldTime: (time: number) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
	// CAMERA MOVEMENT
	cameraIsMoving: false,
	setCameraIsMoving: (moving) => set({ cameraIsMoving: moving }),

	// EDGE LABEL STATE
	edgeSide: null,
	edgeProgress: 0,
	setEdgeState: (side, progress) => set({ edgeSide: side, edgeProgress: progress }),

	edgeHoldTime: 0,
	setEdgeHoldTime: (time) => set({ edgeHoldTime: time }),
}));
