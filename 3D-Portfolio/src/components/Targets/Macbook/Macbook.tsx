import React from "react";
import MacbookUI from "./MacbookUI";
import useCameraMovement from "../../../hooks/useCameraMovement";

import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../../hooks/useFocusContext";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectFocus: selectObjectHovered, setSelectObjectFocus: setSelectObjectHovered } = useHoverContext();
	const { handleClickedTarget } = useCameraMovement();

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
