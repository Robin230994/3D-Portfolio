import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";

import React, { useRef } from "react";
import FCBoxUI from "./FCBoxUI";
import useCameraMovement from "../../../hooks/useCameraMovement";
import { Object3D } from "three";
import { Group } from "three";

const FCBox: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();

	const fcBoxRef = useRef<Group | null>(null);

	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes, selectObjectFocus: selectObjectFocus } },
		functions: { myFunctions: { setSelectObjectFocus } },
		refs: { myRefs: { fcBoxRef } },
	};
	return <FCBoxUI props={uiComponentProps} />;
};

export default FCBox;
