import { useCallback, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useFocusStore } from "../Stores/useFocusStore";

interface IUseInteractionProps {
	onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

const useInteraction = ({ onClick }: IUseInteractionProps = {}) => {
	const [hovered, setHovered] = useState<string | null>(null);

	const onPointerEnter = useCallback((e: ThreeEvent<PointerEvent>) => {
		const selectObjectFocus = useFocusStore.getState().selectObjectFocus;
		if (selectObjectFocus && e.object.name !== "ui-btn") {
			return;
		}
		document.body.style.cursor = "pointer";
		setHovered(e.object.name);
		console.log(e.object.name);
	}, []);

	const onPointerLeave = useCallback(() => {
		document.body.style.cursor = "default";
		setHovered(null);
	}, []);

	const handleClick = useCallback(
		(e: ThreeEvent<MouseEvent>) => {
			e.stopPropagation();
			onClick?.(e);
		},
		[onClick],
	);

	return {
		hovered,
		events: {
			onPointerEnter,
			onPointerLeave,
			onClick: handleClick,
		},
	};
};

export default useInteraction;
