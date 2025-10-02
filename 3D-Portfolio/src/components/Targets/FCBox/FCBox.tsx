import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useObjectInteractionStore } from "../../../Stores/useObjectInteractionStore";

import React, { useRef } from "react";
import FCBoxUI from "./FCBoxUI";

const FCBox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, hoveredObject, setSelectObjectFocus, setHoveredObject } = useObjectInteractionStore();
	const { cameraIsMoving } = useCameraStore();

	const fcBoxRef = useRef<Group | null>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving, hoveredObject } },
		functions: { myFunctions: { setSelectObjectFocus, setHoveredObject } },
		refs: { myRefs: { fcBoxRef } },
	};
	return <FCBoxUI props={uiComponentProps} />;
};

export default FCBox;
