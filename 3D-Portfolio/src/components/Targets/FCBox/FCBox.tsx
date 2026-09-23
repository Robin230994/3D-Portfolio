import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { AnimationAction, Group, LoopOnce } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useProjectPanelStore } from "../../../Stores/useProjectPanelStore";
import { useAnimations } from "@react-three/drei";
import { useControls } from "leva";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useInteraction from "../../../hooks/useInteraction";
import CloseLabel from "../../CloseLabel/CloseLabel";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import FCBoxUI from "./FCBoxUI";

const FCBox: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	/** REFS */
	const fcBoxRef = useRef<Group | null>(null);
	const hasOpenedRef = useRef<boolean>(false);

	/** HOOKS */
	const { actions } = useAnimations(animations!, fcBoxRef);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
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
	const handleFCBoxClick = useCallback(() => {
		if (fcBoxRef.current) {
			setSelectObjectFocus({ name: name, object: fcBoxRef.current });
			setActiveProject("FCBox");
		}
	}, [name, setActiveProject, setSelectObjectFocus]);

	const interaction = useInteraction({
		onClick: handleFCBoxClick,
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
		setActiveProject(null);
	};

	const { backLabelPos, backLabelRot } = useControls("FCBoxLabel", {
		backLabelPos: { value: { x: 0.1, y: 2.2, z: -2.4 }, step: 0.1 },
		backLabelRot: { value: { x: -1.6, y: 0, z: 0.1 }, step: 0.1 },
	});

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

		return () => mixer.removeEventListener("finished", hideLabelsWhenClosed);
	}, [actions, isOpen]);

	useEffect(() => {
		const isFCBoxFocused = selectObjectFocus?.name === name;
		if (isFCBoxFocused || !hasOpenedRef.current) return;

		// The isOpen effect reverses the current animation progress.
		setIsOpen(false);
	}, [name, selectObjectFocus]);

	const uiComponentProps = useMemo(
		() => ({
			data: { myData: { name, nodes, labelsVisible, hovered: interaction.hovered } },
			functions: { myFunctions: { events: interaction.events } },
			refs: { myRefs: { fcBoxRef } },
		}),
		[interaction.events, interaction.hovered, labelsVisible, name, nodes],
	);
	return (
		<>
			<FCBoxUI props={uiComponentProps} />
			<CloseLabel
				scaleFactor={0.25}
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>
			<InteractionLabel
				focusName={name}
				shortcut={1}
				label={!isOpen ? "Open Box" : "Close Box"}
				position={[1, 2.55, -2.4]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={1}
				onTrigger={toggleBox}
			/>
			<InteractionLabel
				focusName={name}
				shortcut={2}
				label={panelClosed ? "Open project description" : "Close project description"}
				position={[1.055, 2.43, -2.4]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={1}
				onTrigger={switchPanel}
			/>
		</>
	);
};

export default FCBox;
