import React, { useEffect, useRef, useState } from "react";
import FloorLampUI from "./FloorLampUI";
import { CustomMeshProps } from "../../../utils/Interfaces";
import { Object3D, SpotLight } from "three";
import useInteraction from "../../../hooks/useInteraction";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import { useControls } from "leva";

const FloorLamp: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const [lightOn, setLightOn] = useState(false);
	const lampLightRef = useRef<SpotLight | null>(null);
	const lampTargetRef = useRef<Object3D | null>(null);

	const interaction = useInteraction({
		onClick: () => {
			setLightOn(!lightOn);
		},
	});

	useEffect(() => {
		if (lampLightRef.current && lampTargetRef.current) {
			lampLightRef.current.target = lampTargetRef.current;
		}
	}, []);

	const { interactionLabelPos } = useControls("Floor Lamp", {
		interactionLabelPos: { value: { x: 2.5, y: 2.3, z: -2.5 }, step: 0.1 },
	});

	const uiComponentProps = {
		data: {
			myData: { name, nodes, lightOn, materials, hovered: interaction.hovered },
		},
		functions: {
			myFunctions: {
				events: interaction.events,
			},
		},
		refs: {
			myRefs: {
				lampLightRef,
				lampTargetRef,
			},
		},
	};

	return (
		<>
			<FloorLampUI props={uiComponentProps} />
			<InteractionLabel
				focusName={name}
				hoveredObject={interaction.hovered}
				visibilityMode="hover"
				shortcut={1}
				scale={1.8}
				label={lightOn ? "Turn light off" : "Turn light on"}
				position={[interactionLabelPos.x, interactionLabelPos.y, interactionLabelPos.z]}
				staticCameraMovement
				onTrigger={() => (lightOn ? setLightOn(false) : setLightOn(true))}
			/>
		</>
	);
};

export default FloorLamp;
