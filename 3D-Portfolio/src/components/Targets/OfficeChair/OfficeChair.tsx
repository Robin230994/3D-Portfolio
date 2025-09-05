import React from "react";
import OfficeChairUI from "./OfficeChairUI";
import useCameraMovement from "../../../hooks/useCameraMovement";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../../hooks/useFocusContext";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectFocus: selectObjectHovered, setSelectObjectFocus: setSelectObjectHovered } = useHoverContext();
	const { handleClickedTarget } = useCameraMovement();

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectHovered } },
		functions: { myFunctions: { setSelectObjectHovered, handleClickedTarget } },
		refs: { myRefs: {} },
	};
	return <OfficeChairUI props={uiComponentProps} />;
};

export default OfficeChair;
