import React, { useRef } from "react";
import OcculusQuestUI from "./OcculusQuestUI";

import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useObjectInteractionStore } from "../../../Stores/useObjectInteractionStore";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus, setIsAnyHovered } = useObjectInteractionStore();
	const { cameraIsMoving } = useCameraStore();

	const occulusRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus, setIsAnyHovered } },
		refs: { myRefs: { occulusRef } },
	};
	return <OcculusQuestUI props={uiComponentProps} />;
};

export default OcculusQuest;
