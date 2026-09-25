import { create } from "zustand";
import { PlaygroundFile } from "../types/GLTypes";

interface ICodePlaygroundStore {
	isOpen: boolean;
	html: string;
	css: string;
	js: string;
	setFile: (file: PlaygroundFile, value: string) => void;
	setIsOpen: (isOpen: boolean) => void;
}

export const useCodePlaygroundStore = create<ICodePlaygroundStore>((set) => ({
	isOpen: false,
	html: "",
	css: "",
	js: "",
	setFile: (file, value) => set({ [file]: value }),
	setIsOpen: (isOpen) => set({ isOpen }),
}));
