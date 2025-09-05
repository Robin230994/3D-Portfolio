import React, { useRef } from "react";
import BambuLabUI from "./BambuLabUI";
import useCameraMovement from "../../../hooks/useCameraMovement";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { Group } from "three";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();

	const bambuLabRef = useRef<Group | null>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus } },
		functions: { myFunctions: { setSelectObjectFocus } },
		refs: { myRefs: { bambuLabRef } },
	};
	return <BambuLabUI props={uiComponentProps} />;
};

export default BambuLab;
