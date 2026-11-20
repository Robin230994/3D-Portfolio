import React, { memo, useRef } from "react";
import WindowUI from "./WindowUI";
import useInteraction from "../../../hooks/useInteraction";
import { CustomMeshProps } from "../../../utils/Interfaces";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import { useControls } from "leva";

const moveTowards = (current: number, target: number, step: number) => {
	if (Math.abs(target - current) <= step) return target;
	return current + Math.sign(target - current) * step;
};

const Window: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const windowRef = useRef<Mesh | null>(null);
	const windowHandleRef = useRef<Mesh | null>(null);
	const windowOpenRef = useRef(false);

	const interaction = useInteraction({
		onClick: () => {
			windowOpenRef.current = windowOpenRef.current ? false : true;
		},
	});

	const { interactionLabelPos } = useControls(
		"Window",
		{
			interactionLabelPos: { value: { x: 8, y: 2.5, z: 1.0 }, step: 0.1 },
		},
		{ collapsed: true },
	);

	useFrame((_, delta) => {
		if (!windowRef.current || !windowHandleRef.current) return;

		const windowRotationStep = (0.15 / 1) * delta;
		const windowHandleRotationStep = (3.14 / 1) * delta;

		if (windowOpenRef.current) {
			// Open: turn the handle completely before moving the window.
			windowHandleRef.current.rotation.x = moveTowards(windowHandleRef.current.rotation.x, 3.14, windowHandleRotationStep);
			if (windowHandleRef.current.rotation.x === 3.14) {
				windowRef.current.rotation.z = moveTowards(windowRef.current.rotation.z, 0.15, windowRotationStep);
			}
			return;
		}

		// Close in reverse: close the window before returning the handle.
		windowRef.current.rotation.z = moveTowards(windowRef.current.rotation.z, 0, windowRotationStep);
		if (windowRef.current.rotation.z === 0) {
			windowHandleRef.current.rotation.x = moveTowards(windowHandleRef.current.rotation.x, 0, windowHandleRotationStep);
		}
	});

	const uiComponentProps = {
		data: {
			myData: { name, nodes, hovered: interaction.hovered },
		},
		functions: { myFunctions: { events: interaction.events } },
		refs: { myRefs: { windowRef, windowHandleRef } },
	};

	return (
		<>
			<WindowUI props={uiComponentProps} />
			<InteractionLabel
				focusName={name}
				hoveredObject={interaction.hovered}
				visibilityMode="hover"
				shortcut={1}
				scale={2}
				label={windowOpenRef.current ? "Close window" : "Open window"}
				position={[interactionLabelPos.x, interactionLabelPos.y, interactionLabelPos.z]}
				staticCameraMovement
				onTrigger={() => (windowOpenRef.current = windowOpenRef.current ? false : true)}
			/>
		</>
	);
};

export default memo(Window);
