import { useState } from "react";
import { HoverContext } from "../Context/SelectHoverObjectContext";

export const SelectObjectProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectObjectHovered, setSelectObjectHovered] = useState<{ [name: string]: boolean }>({ "": false });
	const isAnyHovered = Object.values(selectObjectHovered).some((v) => v);

	return <HoverContext.Provider value={{ selectObjectHovered, setSelectObjectHovered, isAnyHovered }}>{children}</HoverContext.Provider>;
};
