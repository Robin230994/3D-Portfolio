import { create } from "zustand";
import { ColorOption } from "../utils/Types";

export const availableColors: ColorOption[] = [
	{ id: "Russian-Red", name: "Russian-Red", hexCode: "c60000" },
	{ id: "Apple-Green", name: "Apple-Green", hexCode: "4eb343" },
	{ id: "Maroon", name: "Maroon", hexCode: "5b362d" },
	{ id: "Cyan", name: "Cyan", hexCode: "5de5e7" },
	{ id: "Ultramarine", name: "Ultramarine", hexCode: "010b8f" },
	{ id: "Dark-Green", name: "Dark-Green", hexCode: "23692d" },
	{ id: "Lichen", name: "Lichen", hexCode: "96bc7f" },
	{ id: "Metallic-Gold", name: "Metallic-Gold", hexCode: "d4af37" },
	{ id: "Sandy-Brown", name: "Sandy-Brown", hexCode: "ff9e56" },
	{ id: "Light-Pink", name: "Light-Pink", hexCode: "ff727d" },
	{ id: "Dusty-Rose", name: "Dusty-Rose", hexCode: "c981a3" },
	{ id: "Terracotta", name: "Terracotta", hexCode: "e0a07a" },
	{ id: "Shadow-Woods", name: "Shadow-Woods", hexCode: "877a5b" },
	{ id: "White", name: "White", hexCode: "ffffff" },
	{ id: "Black", name: "Black", hexCode: "000000" },
];

interface IPaintingStore {
	selectedColor: ColorOption | null;
	mixColorOne: ColorOption | null;
	mixColorTwo: ColorOption | null;
	mixedColor: ColorOption | null;
	brushSize: number;
	setSelectedColor: (color: ColorOption | null) => void;
	setMixColorOne: (color: ColorOption | null) => void;
	setMixColorTwo: (color: ColorOption | null) => void;
	setMixedColor: (mixedColor: ColorOption | null) => void;
	setBrushSize: (size: number) => void;
}

const usePaintingStore = create<IPaintingStore>((set) => ({
	selectedColor: availableColors[13], // White as default color,
	mixColorOne: null,
	mixColorTwo: null,
	mixedColor: null,
	brushSize: 3,
	setSelectedColor: (color) => set({ selectedColor: color }),
	setMixColorOne: (color) => set({ mixColorOne: color }),
	setMixColorTwo: (color) => set({ mixColorTwo: color }),
	setMixedColor: (mixedColor) => set({ mixedColor: mixedColor }),
	setBrushSize: (size) => set({ brushSize: size }),
}));

export default usePaintingStore;
