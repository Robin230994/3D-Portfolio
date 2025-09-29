import React, { useRef } from "react";
import MacbookUI from "./MacbookUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useObjectInteractionStore } from "../../../Stores/useObjectInteractionStore";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus, setIsAnyHovered } = useObjectInteractionStore();
	const { cameraIsMoving } = useCameraStore();

	const macbookRef = useRef<Group>(null);

	const uiComponentProps = {
		data: {
			myData: {
				name,
				nodes,
				selectObjectFocus,
				cameraIsMoving,
			},
		},
		functions: { myFunctions: { setSelectObjectFocus, setIsAnyHovered } },
		refs: { myRefs: { macbookRef } },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
