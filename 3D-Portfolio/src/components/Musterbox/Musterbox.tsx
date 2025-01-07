import React from "react";
import MusterboxUI from "./MusterboxUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const Musterbox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <MusterboxUI props={uiComponentProps} />;
};

export default Musterbox;
