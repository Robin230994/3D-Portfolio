import React, { useRef } from "react";
import BambuLabUI from "./BambuLabUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { Group } from "three";
import { useCameraContext } from "../../../hooks/useCameraContext";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();
	const { cameraIsMoving } = useCameraContext();

	const bambuLabRef = useRef<Group | null>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus } },
		refs: { myRefs: { bambuLabRef } },
	};
	return <BambuLabUI props={uiComponentProps} />;
};

export default BambuLab;
