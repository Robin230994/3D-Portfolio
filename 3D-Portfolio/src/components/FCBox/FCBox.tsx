import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import React from "react";
import FCBoxUI from "./FCBoxUI";

const FCBox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <FCBoxUI props={uiComponentProps} />;
};

export default FCBox;
