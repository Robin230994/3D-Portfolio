import React from "react";
import MacbookUI from "./MacbookUI";
import useCameraMovement from "../../../hooks/useCameraControlsMovement";

import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../../hooks/useHoverContext";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();
	const { handleClickedTarget } = useCameraMovement(cameraControls!);

	const uiComponentProps = {
		data: {
			myData: {
				name: name,
				nodes: nodes,
				selectObjectHovered: selectObjectHovered,
			},
		},
		functions: { myFunctions: { setSelectObjectHovered, handleClickedTarget } },
		refs: { myRefs: {} },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
