import { create } from "zustand";

export enum VRTransition {
	IDLE,
	ENTERING,
	BLACKOUT,
	PLAYING,
	EXITING,
	RETURNING,
}

interface IVRStore {
	vrPhase: VRTransition;
	setVRPhase: (phase: VRTransition) => void;
}

export const useVRStore = create<IVRStore>((set) => ({
	vrPhase: VRTransition.IDLE,
	setVRPhase: (phase) => set({ vrPhase: phase }),
}));
