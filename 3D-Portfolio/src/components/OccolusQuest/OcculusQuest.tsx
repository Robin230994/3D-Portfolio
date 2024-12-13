import React from "react";
import OcculusQuestUI from "./OcculusQuestUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <OcculusQuestUI props={uiComponentProps} />;
};

export default OcculusQuest;
