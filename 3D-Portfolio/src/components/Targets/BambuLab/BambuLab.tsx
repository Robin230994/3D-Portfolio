import React, { useRef } from "react";
import BambuLabUI from "./BambuLabUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { Group } from "three";
import { useHoverContext } from "../../../hooks/useHoverContext";
import { useCameraStore } from "../../../Stores/useCameraStore";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();
	const { setIsAnyHovered } = useHoverContext();
	const { cameraIsMoving } = useCameraStore();

	const bambuLabRef = useRef<Group | null>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus, setIsAnyHovered } },
		refs: { myRefs: { bambuLabRef } },
	};
	return <BambuLabUI props={uiComponentProps} />;
};

export default BambuLab;
