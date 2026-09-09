import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { AnimationAction, Group, LoopOnce } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useProjectPanelStore } from "../../../Stores/useProjectPanelStore";
import { useAnimations } from "@react-three/drei";

import React, { useCallback, useEffect, useRef, useState } from "react";
import FCBoxUI from "./FCBoxUI";
import useInteraction from "../../../hooks/useInteraction";

const FCBox: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	/** REFS */
	const fcBoxRef = useRef<Group | null>(null);
	const hasOpenedRef = useRef<boolean>(false);

	/** HOOKS */
	const { actions } = useAnimations(animations!, fcBoxRef);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const interaction = useInteraction({
		onClick: () => {
			if (fcBoxRef.current) {
				setSelectObjectFocus({ name: name, object: fcBoxRef.current });
				setActiveProject("FCBox");
			}
		},
	});
	const panelClosed = useProjectPanelStore((state) => state.panelClosed);
	const setPanelClosed = useProjectPanelStore((state) => state.setPanelClosed);
	const setActiveProject = useProjectPanelStore((state) => state.setActiveProject);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);

	/** STATES */
	const [isOpen, setIsOpen] = useState(false);
	const [labelsVisible, setLabelsVisible] = useState(false);

	/** FUNCTIONS */
	const switchPanel = useCallback(() => setPanelClosed(!panelClosed), [panelClosed, setPanelClosed]);
	const toggleBox = useCallback(() => setIsOpen((open) => !open), []);

	const dispatch = () => {
		setSelectObjectFocus(null);
		setActiveProject(null);
	};

	useEffect(() => {
		const animation = actions.FCBoxOpen;
		if (!animation) return;

		if (isOpen) {
			setLabelsVisible(true);
			animation.reset();
			animation.timeScale = 1;
			animation.setLoop(LoopOnce, 1);
			animation.clampWhenFinished = true;
			animation.play();
			hasOpenedRef.current = true;
			return;
		}

		if (!hasOpenedRef.current) return;

		const mixer = animation.getMixer();
		const hideLabelsWhenClosed = (event: { action: AnimationAction }) => {
			if (event.action === animation) {
				setLabelsVisible(false);
				mixer.removeEventListener("finished", hideLabelsWhenClosed);
			}
		};
		mixer.addEventListener("finished", hideLabelsWhenClosed);

		if (!animation.isRunning()) {
			animation.time = animation.getClip().duration;
		}

		animation.paused = false;
		animation.timeScale = -1;
		animation.setLoop(LoopOnce, 1);
		animation.clampWhenFinished = true;
		animation.play();
	}, [actions, isOpen]);

	const uiComponentProps = {
		data: { myData: { name, nodes, isOpen, panelClosed, labelsVisible, cameraIsMoving, hovered: interaction.hovered } },
		functions: { myFunctions: { dispatch, switchPanel, toggleBox, events: interaction.events } },
		refs: { myRefs: { fcBoxRef } },
	};
	return <FCBoxUI props={uiComponentProps} />;
};

export default FCBox;
