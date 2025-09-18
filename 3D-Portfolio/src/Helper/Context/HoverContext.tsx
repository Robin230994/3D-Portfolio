import { createContext } from "react";

type HoverContextType = {
	isAnyHovered: boolean;
	setIsAnyHovered: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HoverContext = createContext<HoverContextType | undefined>(undefined);
