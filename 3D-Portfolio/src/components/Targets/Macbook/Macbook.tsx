import React, { useRef } from "react";
import MacbookUI from "./MacbookUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { useCameraContext } from "../../../hooks/useCameraContext";
import { Group } from "three";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();
	const { cameraIsMoving } = useCameraContext();

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
		functions: { myFunctions: { setSelectObjectFocus } },
		refs: { myRefs: { macbookRef } },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
