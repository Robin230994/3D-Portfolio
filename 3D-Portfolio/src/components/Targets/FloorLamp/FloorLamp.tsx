import React, { useRef, useState } from "react";
import FloorLampUI from "./FloorLampUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { PointLight } from "three";
import useInteraction from "../../../hooks/useInteraction";

const FloorLamp: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const [lightOn, setLightOn] = useState(false);
	const lampLightRef = useRef<PointLight | null>(null);

	const interaction = useInteraction({
		onClick: () => {
			setLightOn(!lightOn);
		},
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
			},
		},
	};
	return <FloorLampUI props={uiComponentProps} />;
};

export default FloorLamp;
