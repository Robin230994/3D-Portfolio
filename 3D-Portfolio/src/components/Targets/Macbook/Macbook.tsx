import React, { useEffect, useRef, useState } from "react";
import MacbookUI from "./MacbookUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group, LoopOnce, Mesh } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import useInteraction from "../../../hooks/useInteraction";
import { useAnimations } from "@react-three/drei";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);

	const [activeProject, setActiveProject] = useState<"About me" | "Websites" | "Apps">("Websites");

	const macbookRef = useRef<Group>(null);
	const macbookTopSideRef = useRef<Mesh>(null);
	const lastFocusObjectMacbook = useRef(false);
	const [screenVisible, setScreenVisible] = useState(false);

	const { actions } = useAnimations(animations!, macbookTopSideRef);

	useEffect(() => {
		const animation = actions["MacbookOpen"];

		if (!animation) return;

		const isMacbookFocused = selectObjectFocus?.name === "Macbook";
		let displayTimer: number | undefined;

		if (isMacbookFocused && !lastFocusObjectMacbook.current) {
			// Open
			animation.reset();
			animation.timeScale = 1;
			animation.setLoop(LoopOnce, 1);
			animation.clampWhenFinished = true;
			animation.play();

			// Turn the display on near the end of the lid-opening animation.
			const displayDelay = animation.getClip().duration * 0.72 * 1000;
			displayTimer = window.setTimeout(() => setScreenVisible(true), displayDelay);
		}
		if (!isMacbookFocused && lastFocusObjectMacbook.current) {
			// Close / reverse
			animation.paused = false;
			animation.timeScale = -1;
			animation.setLoop(LoopOnce, 1);
			animation.clampWhenFinished = true;

			// Start at the end of the animation
			animation.time = animation.getClip().duration;
			animation.play();

			const displayDelay = animation.getClip().duration * 0.5 * 1000;
			displayTimer = window.setTimeout(() => setScreenVisible(false), displayDelay);
		}

		lastFocusObjectMacbook.current = isMacbookFocused;

		return () => {
			if (displayTimer !== undefined) window.clearTimeout(displayTimer);
			animation.stop();
			animation.timeScale = 1;
		};
	}, [actions, selectObjectFocus]);

	const interaction = useInteraction({
		onClick: () => {
			if (macbookRef.current) {
				setSelectObjectFocus({ name: name, object: macbookRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const uiComponentProps = {
		data: {
			myData: {
				name,
				nodes,
				cameraIsMoving,
				hovered: interaction.hovered,
				screenVisible,
				animations,
				activeProject,
			},
		},
		functions: { myFunctions: { dispatch, setActiveProject, events: interaction.events } },
		refs: { myRefs: { macbookRef, macbookTopSideRef } },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
