import React from "react";
import MacbookUI from "./MacbookUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: {
			myData: {
				name: name,
				nodes: nodes,
			},
		},
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
