import { useEffect } from "react";
import { useObjectInteractionStore } from "../Stores/useObjectInteractionStore";

const useCursorEffect = () => {
	const { isAnyHovered } = useObjectInteractionStore();

	useEffect(() => {
		document.body.style.cursor = isAnyHovered ? "pointer" : "default";
	}, [isAnyHovered]);
};
export default useCursorEffect;
