import { useContext } from "react";
import { HoverContext } from "../Helper/Context/HoverContext";

export const useHoverContext = () => {
	const context = useContext(HoverContext);
	if (!context) throw new Error("useFocusContext must be used within a FocusContextProvider");
	return context;
};
