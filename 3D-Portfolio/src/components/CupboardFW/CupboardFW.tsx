import React from "react";
import CupboardFWUI from "./CupboardFWUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const CupboardFW: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <CupboardFWUI props={uiComponentProps} />;
};

export default CupboardFW;
