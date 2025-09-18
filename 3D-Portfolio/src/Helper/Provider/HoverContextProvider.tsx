import { useState } from "react";
import { HoverContext } from "../Context/HoverContext";

export const HoverContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAnyHovered, setIsAnyHovered] = useState<boolean>(false);

	return <HoverContext.Provider value={{ isAnyHovered, setIsAnyHovered }}>{children}</HoverContext.Provider>;
};
