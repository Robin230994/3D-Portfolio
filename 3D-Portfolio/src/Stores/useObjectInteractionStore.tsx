import { create } from "zustand";
import { Object3D } from "three";

interface ObjectInteractionState {
	// Hover state
	hoveredObject: string | null;
	setHoveredObject: (objectName: string | null) => void;

	// Focus state
	selectObjectFocus: { name: string; object: Object3D } | null;
	setSelectObjectFocus: (focus: { name: string; object: Object3D } | null) => void;
}

export const useObjectInteractionStore = create<ObjectInteractionState>((set) => ({
	// Hover
	hoveredObject: null,
	setHoveredObject: (objectName) => set({ hoveredObject: objectName }),

	// Focus
	selectObjectFocus: null,
	setSelectObjectFocus: (focus) => set({ selectObjectFocus: focus }),
}));
