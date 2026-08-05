import { useEffect } from "react";
import { useFocusStore } from "../Stores/useFocusStore";

const useCursorEffect = () => {
	const hoveredObject = useFocusStore((state) => state.hoveredObject);

	useEffect(() => {
		document.body.style.cursor = hoveredObject !== null ? "pointer" : "default";
	}, [hoveredObject]);
};
export default useCursorEffect;
