import React from "react";
import LogosUI from "./LogosUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useObjectInteractionStore } from "../../../Stores/useObjectInteractionStore";

const Logos: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const { hoveredObject, setHoveredObject } = useObjectInteractionStore();

	const uiComponentProps = {
		data: {
			myData: { name, nodes, hoveredObject, materials },
		},
		functions: {
			myFunctions: {
				setHoveredObject,
			},
		},
		refs: { myRefs: {} },
	};
	return <LogosUI props={uiComponentProps} />;
};

export default Logos;
