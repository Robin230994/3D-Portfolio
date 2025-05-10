import { createContext, useContext, useState } from "react";

type HoverContextType = {
	selectObjectHovered: boolean;
	setSelectObjectHovered: (hovered: boolean) => void;
};

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const SelectObjectProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectObjectHovered, setSelectObjectHovered] = useState(false);

	return <HoverContext.Provider value={{ selectObjectHovered, setSelectObjectHovered }}>{children}</HoverContext.Provider>;
};

export const useHoverContext = () => {
	const context = useContext(HoverContext);
	if (!context) throw new Error("useHoverContext must be used within a HoverProvider");
	return context;
};
