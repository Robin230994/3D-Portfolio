import { useEffect } from "react";
import useInteraction from "./useInteraction";

const useCursorEffect = () => {
	const { hovered } = useInteraction();

	useEffect(() => {
		document.body.style.cursor = hovered !== null ? "pointer" : "default";
	}, [hovered]);
};
export default useCursorEffect;
