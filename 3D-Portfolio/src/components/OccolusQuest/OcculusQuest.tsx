import React, { useRef } from "react";
import OcculusQuestUI from "./OcculusQuestUI";

import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../hooks/useHoverContext";
import { Group } from "three";

import useCameraMovement from "../../hooks/useCameraControlsMovement";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();
	const { handleClickedTarget } = useCameraMovement(cameraControls!);

	const occulusRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes, selectObjectHovered: selectObjectHovered } },
		functions: { myFunctions: { setSelectObjectHovered, handleClickedTarget } },
		refs: { myRefs: { occulusRef } },
	};
	return <OcculusQuestUI props={uiComponentProps} />;
};

export default OcculusQuest;
