import React, { useRef } from "react";
import MusterboxUI from "./MusterboxUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { useCameraContext } from "../../../hooks/useCameraContext";
import { useHoverContext } from "../../../hooks/useHoverContext";

const Musterbox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();
	const { setIsAnyHovered } = useHoverContext();
	const { cameraIsMoving } = useCameraContext();

	const musterboxRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus, setIsAnyHovered } },
		refs: { myRefs: { musterboxRef } },
	};
	return <MusterboxUI props={uiComponentProps} />;
};

export default Musterbox;
