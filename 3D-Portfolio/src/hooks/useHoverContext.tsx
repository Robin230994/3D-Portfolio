import { useContext } from "react";
import { HoverContext } from "../Helper/Context/SelectHoverObjectContext";

export const useHoverContext = () => {
	const context = useContext(HoverContext);
	if (!context) throw new Error("useHoverContext must be used within a HoverProvider");
	return context;
};
