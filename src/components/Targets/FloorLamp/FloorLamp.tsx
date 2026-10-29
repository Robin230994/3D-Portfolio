import React, { useEffect, useRef, useState } from "react";
import FloorLampUI from "./FloorLampUI";
import { CustomMeshProps } from "../../../utils/Interfaces";
import { Object3D, SpotLight } from "three";
import useInteraction from "../../../hooks/useInteraction";

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
	return <FloorLampUI props={uiComponentProps} />;
};

export default FloorLamp;
