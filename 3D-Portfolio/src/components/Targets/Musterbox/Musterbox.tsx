import React, { useRef } from "react";
import MusterboxUI from "./MusterboxUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useObjectInteractionStore } from "../../../Stores/useObjectInteractionStore";

const Musterbox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus, setIsAnyHovered } = useObjectInteractionStore();
	const { cameraIsMoving } = useCameraStore();

	const musterboxRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus, setIsAnyHovered } },
		refs: { myRefs: { musterboxRef } },
	};
	return <MusterboxUI props={uiComponentProps} />;
};

export default Musterbox;
