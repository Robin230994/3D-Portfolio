import React, { useRef } from "react";
import BillardTriangleUI from "./BillardTriangleUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useObjectInteractionStore } from "../../../Stores/useObjectInteractionStore";

const BillardTriangle: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus, setIsAnyHovered } = useObjectInteractionStore();
	const { cameraIsMoving } = useCameraStore();

	const triangleRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus, setIsAnyHovered } },
		refs: { myRefs: { triangleRef } },
	};
	return <BillardTriangleUI props={uiComponentProps} />;
};

export default BillardTriangle;
