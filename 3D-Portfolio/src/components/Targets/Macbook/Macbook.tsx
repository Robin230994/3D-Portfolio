import React, { useEffect, useRef, useState } from "react";
import MacbookUI from "./MacbookUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group, LoopOnce, Mesh } from "three";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, PerspectiveCamera } from "three";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const [activeTab, setActiveTab] = useState<"About me" | "Projects" | "Websites" | "Apps">("Websites");

	const [screenVisible, setScreenVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const macbookRef = useRef<Group>(null);
	const macbookTopSideRef = useRef<Mesh>(null);
	const lastFocusObjectScreen = useRef(false);

	const { camera } = useThree();
	const { actions } = useAnimations(animations!, macbookTopSideRef);

	const initialZoom = useRef(camera instanceof PerspectiveCamera ? camera.zoom : 1);

	// zoom in when the mouse hovers the macbook
	// useFrame((_, delta) => {
	// 	if (!(camera instanceof PerspectiveCamera)) return;

	// 	const targetZoom = initialZoom.current * (isHovered ? 2 : 1);
	// 	const nextZoom = MathUtils.damp(camera.zoom, targetZoom, 7, delta);

	// 	if (Math.abs(nextZoom - camera.zoom) < 0.0001) return;
	// 	camera.zoom = nextZoom;
	// 	camera.updateProjectionMatrix();
	// });

	useEffect(() => {
		const animation = actions["MacbookOpen"];
		if (!animation) return;

		const isScreenFocused = selectObjectFocus?.name === "Screen";
		let displayTimer: number | undefined;

		if (isScreenFocused && !lastFocusObjectScreen.current) {
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
		if (!isScreenFocused && lastFocusObjectScreen.current) {
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

		lastFocusObjectScreen.current = isScreenFocused;

		return () => {
			if (displayTimer !== undefined) window.clearTimeout(displayTimer);
			animation.stop();
			animation.timeScale = 1;
		};
	}, [actions, selectObjectFocus]);

	const uiComponentProps = {
		data: {
			myData: {
				name,
				nodes,
				screenVisible,
				animations,
				activeTab,
			},
		},
		functions: { myFunctions: { setActiveTab, setIsHovered } },
		refs: { myRefs: { macbookRef, macbookTopSideRef } },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
