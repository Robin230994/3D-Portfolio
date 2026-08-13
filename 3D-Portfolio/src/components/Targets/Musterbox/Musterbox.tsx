import React, { useCallback, useEffect, useRef, useState } from "react";
import MusterboxUI from "./MusterboxUI";
import useInteraction from "../../../hooks/useInteraction";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group, LoopOnce } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useAnimations } from "@react-three/drei";

const Musterbox: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const musterboxRef = useRef<Group>(null);
	const hasOpenedRef = useRef(false);

	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const { actions } = useAnimations(animations!, musterboxRef);

	const [isOpen, setIsOpen] = useState(false);

	const interaction = useInteraction({
		onClick: () => {
			if (musterboxRef.current) {
				setSelectObjectFocus({ name: name, object: musterboxRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const openBox = useCallback(() => setIsOpen(true), []);

	useEffect(() => {
		if (!isOpen) return;

		const animation = actions.MusterboxOpen;
		if (!animation) return;

		animation.reset();
		animation.timeScale = 1;
		animation.setLoop(LoopOnce, 1);
		animation.clampWhenFinished = true;
		animation.play();
		hasOpenedRef.current = true;
	}, [actions, isOpen]);

	useEffect(() => {
		const isMusterboxFocused = selectObjectFocus?.name === name;
		if (isMusterboxFocused || !hasOpenedRef.current) return;

		const animation = actions.MusterboxOpen;
		if (!animation) return;

		// If the box was fully open the action is paused at its end; otherwise
		// keep its current progress and reverse from that exact point.
		if (!animation.isRunning()) {
			animation.time = animation.getClip().duration;
		}
		animation.paused = false;
		animation.timeScale = -1;
		animation.setLoop(LoopOnce, 1);
		animation.clampWhenFinished = true;
		animation.play();

		setIsOpen(false);
		hasOpenedRef.current = false;
	}, [actions, name, selectObjectFocus]);

	const uiComponentProps = {
		data: { myData: { name, nodes, cameraIsMoving, hovered: interaction.hovered } },
		functions: { myFunctions: { dispatch, openBox, events: interaction.events } },
		refs: { myRefs: { musterboxRef } },
	};
	return <MusterboxUI props={uiComponentProps} />;
};

export default Musterbox;
