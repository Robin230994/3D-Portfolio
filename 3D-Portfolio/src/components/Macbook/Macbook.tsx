import React, { useRef } from "react";
import MacbookUI from "./MacbookUI";
import useCameraMovement from "../../hooks/useCameraControlsMovement";

import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../hooks/useHoverContext";
import { Object3D } from "three";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes, cameraControls }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();
	const { handleClickedTarget } = useCameraMovement(cameraControls!);

	const macbookRef = useRef<Object3D | null>(null);

	const uiComponentProps = {
		data: {
			myData: {
				name: name,
				nodes: nodes,
				selectObjectHovered: selectObjectHovered,
			},
		},
		functions: { myFunctions: { setSelectObjectHovered, handleClickedTarget } },
		refs: { myRefs: { macbookRef } },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
