import React, { useRef } from "react";
import LogosUI from "./LogosUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { Mesh } from "three/src/objects/Mesh.js";

const Logos: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const setHoveredObject = useFocusStore((state) => state.setHoveredObject);

	const linkedInLogoRef = useRef<Mesh>(null);
	const githubLogoRef = useRef<Mesh>(null);

	const uiComponentProps = {
		data: {
			myData: { name, nodes, materials },
		},
		functions: {
			myFunctions: {
				setHoveredObject,
			},
		},
		refs: {
			myRefs: {
				linkedInLogoRef,
				githubLogoRef,
			},
		},
	};
	return <LogosUI props={uiComponentProps} />;
};

export default Logos;
