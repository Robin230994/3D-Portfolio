import { useEffect } from "react";
import { useHoverContext } from "./useHoverContext";

const useCursorEffect = () => {
	const { isAnyHovered } = useHoverContext();

	useEffect(() => {
		document.body.style.cursor = isAnyHovered ? "pointer" : "default";
	}, [isAnyHovered]);
};
export default useCursorEffect;
