import { create } from "zustand";
import { PlaygroundFile } from "../utils/Types";
import html from "../playground/playground.html?raw";
import css from "../playground/playground.css?raw";
import js from "../playground/playground.js?raw";

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
	html: html,
	css: css,
	js: js,
	setFile: (file, value) => set({ [file]: value }),
	setIsOpen: (isOpen) => set({ isOpen }),
}));
