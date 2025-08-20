import React from "react";
import OfficeChairUI from "./OfficeChairUI";
import useCameraMovement from "../../../hooks/useCameraControlsMovement";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../../hooks/useHoverContext";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();
	const { handleClickedTarget } = useCameraMovement(cameraControls!);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectHovered } },
		functions: { myFunctions: { setSelectObjectHovered, handleClickedTarget } },
		refs: { myRefs: {} },
	};
	return <OfficeChairUI props={uiComponentProps} />;
};

export default OfficeChair;
