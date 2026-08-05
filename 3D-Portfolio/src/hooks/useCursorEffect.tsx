import { useEffect } from "react";
import { useObjectInteractionStore } from "../Stores/useObjectInteractionStore";

const useCursorEffect = () => {
	const hoveredObject = useObjectInteractionStore((state) => state.hoveredObject);

	useEffect(() => {
		document.body.style.cursor = hoveredObject !== null ? "pointer" : "default";
	}, [hoveredObject]);
};
export default useCursorEffect;
