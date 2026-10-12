import { create } from "zustand";

type ColorOption = {
	name: string;
	hexCode: string;
};

export const availableColors: ColorOption[] = [
	{ name: "Russian-Red", hexCode: "c60000" },
	{ name: "Apple-Green", hexCode: "4eb343" },
	{ name: "Maroon", hexCode: "5b362d" },
	{ name: "Cyan", hexCode: "5de5e7" },
	{ name: "Ultramarine", hexCode: "010b8f" },
	{ name: "Dark-Green", hexCode: "23692d" },
	{ name: "Lichen", hexCode: "96bc7f" },
	{ name: "Metallic-Gold", hexCode: "d4af37" },
	{ name: "Sandy-Brown", hexCode: "ff9e56" },
	{ name: "Light-Pink", hexCode: "ff727d" },
	{ name: "Dusty-Rose", hexCode: "c981a3" },
	{ name: "Shadow-Woods", hexCode: "877a5b" },
	{ name: "White", hexCode: "ffffff" },
	{ name: "Black", hexCode: "000000" },
];

interface IPaintingStore {
	selectedColor: ColorOption | null;
	setSelectedColor: (color: ColorOption | null) => void;
}

const usePaintingStore = create<IPaintingStore>((set) => ({
	selectedColor: null,
	setSelectedColor: (color) => set({ selectedColor: color }),
}));

export default usePaintingStore;
