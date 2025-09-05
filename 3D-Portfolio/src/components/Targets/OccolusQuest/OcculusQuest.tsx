import React, { useRef } from "react";
import OcculusQuestUI from "./OcculusQuestUI";

import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { Group } from "three";

import useCameraMovement from "../../../hooks/useCameraMovement";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();

	const occulusRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus } },
		functions: { myFunctions: { setSelectObjectFocus } },
		refs: { myRefs: { occulusRef } },
	};
	return <OcculusQuestUI props={uiComponentProps} />;
};

export default OcculusQuest;
