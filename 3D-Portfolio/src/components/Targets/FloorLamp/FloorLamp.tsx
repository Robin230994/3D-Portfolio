import React, { useRef, useState } from "react";
import FloorLampUI from "./FloorLampUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { PointLight } from "three";

const FloorLamp: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const { hoveredObject, setHoveredObject } = useFocusStore();

	const [lightOn, setLightOn] = useState(false);
	const lampLightRef = useRef<PointLight | null>(null);

	const uiComponentProps = {
		data: {
			myData: { name, nodes, lightOn, materials, hoveredObject },
		},
		functions: {
			myFunctions: {
				setHoveredObject,
				setLightOn,
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
