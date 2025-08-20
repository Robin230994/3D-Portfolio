import React from "react";
import OfficeChairUI from "./OfficeChairUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../../hooks/useHoverContext";
import useCameraMovement from "../../../hooks/useCameraControlsMovement";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes, materials, cameraControls }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();
	const { handleClickedTarget } = useCameraMovement(cameraControls!);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectHovered, materials } },
		functions: { myFunctions: { setSelectObjectHovered, handleClickedTarget } },
		refs: { myRefs: {} },
	};
	return <OfficeChairUI props={uiComponentProps} />;
};

export default OfficeChair;
