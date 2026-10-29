import { create } from "zustand";
import { Object3D } from "three";

interface IFocusProps {
	// Focus state
	selectObjectFocus: { name: string; object: Object3D } | null;
	setSelectObjectFocus: (focus: { name: string; object: Object3D } | null) => void;
}

export const useFocusStore = create<IFocusProps>((set) => ({
	// Focus
	selectObjectFocus: null,
	setSelectObjectFocus: (focus) => set({ selectObjectFocus: focus }),
}));
