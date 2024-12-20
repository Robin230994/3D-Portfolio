import React from "react";
import BambuLabUI from "./BambuLabUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <BambuLabUI props={uiComponentProps} />;
};

export default BambuLab;
