import React, { useRef } from "react";
import OcculusQuestUI from "./OcculusQuestUI";

import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { Group } from "three";
import { useCameraContext } from "../../../hooks/useCameraContext";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();
	const { cameraIsMoving } = useCameraContext();

	const occulusRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus } },
		refs: { myRefs: { occulusRef } },
	};
	return <OcculusQuestUI props={uiComponentProps} />;
};

export default OcculusQuest;
