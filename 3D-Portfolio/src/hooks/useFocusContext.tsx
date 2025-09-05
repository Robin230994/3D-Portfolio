import { useContext } from "react";
import { FocusContext } from "../Helper/Context/FocusContext";

export const useFocusContext = () => {
	const context = useContext(FocusContext);
	if (!context) throw new Error("useFocusContext must be used within a FocusContextProvider");
	return context;
};
