import { create } from "zustand";

interface IScreenMediaStore {
	activeVideo: string | null;
	setActiveVideo: (videoPath: string | null) => void;
}

export const useScreenMediaStore = create<IScreenMediaStore>((set) => ({
	activeVideo: null,
	setActiveVideo: (path) => set({ activeVideo: path }),
}));
