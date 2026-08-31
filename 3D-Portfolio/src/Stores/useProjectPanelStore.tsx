import { create } from "zustand";
interface IProjectPanelStore {
	panelClosed: boolean;
	setPanelClosed: (state: boolean) => void;
}

export const useProjectPanelStore = create<IProjectPanelStore>((set) => ({
	panelClosed: false,
	setPanelClosed: (state) => set({ panelClosed: state }),
}));
