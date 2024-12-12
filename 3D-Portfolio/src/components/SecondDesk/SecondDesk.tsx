import React from "react";
import SecondDeskUI from "./SecondDeskUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const SecondDesk: React.FC<CustomMeshProps> = ({ name, nodes }) => {
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
	return <SecondDeskUI props={uiComponentProps} />;
};

export default SecondDesk;
