import React from "react";
import CupboardLWUI from "./CupboardLWUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const CupboardLW: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <CupboardLWUI props={uiComponentProps} />;
};

export default CupboardLW;
