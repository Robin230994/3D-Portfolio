import React from "react";
import OcculusQuestUI from "./OcculusQuestUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../hooks/useHoverContext";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();

	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes, selectObjectHovered: selectObjectHovered } },
		functions: { myFunctions: { setSelectObjectHovered } },
		refs: { myRefs: {} },
	};
	return <OcculusQuestUI props={uiComponentProps} />;
};

export default OcculusQuest;
