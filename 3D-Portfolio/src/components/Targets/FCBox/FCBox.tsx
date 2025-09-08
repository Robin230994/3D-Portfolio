import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { Group } from "three";
import { useCameraContext } from "../../../hooks/useCameraContext";

import React, { useRef } from "react";
import FCBoxUI from "./FCBoxUI";

const FCBox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();
	const { cameraIsMoving } = useCameraContext();

	const fcBoxRef = useRef<Group | null>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus } },
		refs: { myRefs: { fcBoxRef } },
	};
	return <FCBoxUI props={uiComponentProps} />;
};

export default FCBox;
