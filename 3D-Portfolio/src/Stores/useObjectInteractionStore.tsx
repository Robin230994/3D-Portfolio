import { create } from "zustand";
import { Object3D } from "three";

interface ObjectInteractionState {
	// Hover state
	isAnyHovered: boolean;
	setIsAnyHovered: (hovered: boolean) => void;

	// Focus state
	selectObjectFocus: { name: string; object: Object3D } | null;
	setSelectObjectFocus: (focus: { name: string; object: Object3D } | null) => void;
}

export const useObjectInteractionStore = create<ObjectInteractionState>((set) => ({
	// Hover
	isAnyHovered: false,
	setIsAnyHovered: (hovered) => set({ isAnyHovered: hovered }),

	// Focus
	selectObjectFocus: null,
	setSelectObjectFocus: (focus) => set({ selectObjectFocus: focus }),
}));
