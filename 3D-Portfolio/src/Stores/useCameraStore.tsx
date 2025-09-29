import { create } from "zustand";

interface CameraState {
	edgeSide: "left" | "right" | null;
	edgeProgress: number;
	setEdgeState: (side: "left" | "right" | null, progress: number) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
	edgeSide: null,
	edgeProgress: 0,
	setEdgeState: (side, progress) => set({ edgeSide: side, edgeProgress: progress }),
}));
