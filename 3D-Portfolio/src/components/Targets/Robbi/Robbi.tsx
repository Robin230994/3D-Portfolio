import React, { useRef } from "react";
import RobbiUI from "./RobbiUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";

const Robbi: React.FC<CustomMeshProps> = ({ name, nodes, materials, animations }) => {
	const rigRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, materials, animations } },
		functions: { myFunctions: {} },
		refs: { myRefs: { rigRef } },
	};
	return <RobbiUI props={uiComponentProps} />;
};

export default Robbi;
