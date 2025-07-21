import React, { useRef } from "react";
import BambuLabUI from "./BambuLabUI";
import useCameraMovement from "../../hooks/useCameraControlsMovement";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../hooks/useHoverContext";
import { Group } from "three";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();
	const { handleClickedTarget } = useCameraMovement(cameraControls!);

	const bambuLabRef = useRef<Group | null>(null);

	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes, selectObjectHovered: selectObjectHovered } },
		functions: { myFunctions: { setSelectObjectHovered, handleClickedTarget } },
		refs: { myRefs: { bambuLabRef } },
	};
	return <BambuLabUI props={uiComponentProps} />;
};

export default BambuLab;
