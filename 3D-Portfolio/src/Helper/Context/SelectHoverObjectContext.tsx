import { createContext } from "react";

type HoverContextType = {
	selectObjectHovered: { [name: string]: boolean };
	setSelectObjectHovered: (hovered: { [name: string]: boolean }) => void;
	isAnyHovered: boolean;
};

export const HoverContext = createContext<HoverContextType | undefined>(undefined);
