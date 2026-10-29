import { create } from "zustand";
interface IProjectPanelStore {
	panelClosed: boolean;
	activeProject: string | null;
	setPanelClosed: (state: boolean) => void;
	setActiveProject: (projectName: string | null) => void;
}

export const useProjectPanelStore = create<IProjectPanelStore>((set) => ({
	panelClosed: false,
	activeProject: "",
	setPanelClosed: (state) => set({ panelClosed: state }),
	setActiveProject: (projectName: string | null) => set({ activeProject: projectName }),
}));
