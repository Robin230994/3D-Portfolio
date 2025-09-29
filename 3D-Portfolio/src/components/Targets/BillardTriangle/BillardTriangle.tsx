import React, { useRef } from "react";
import BillardTriangleUI from "./BillardTriangleUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { Group } from "three";
import { useHoverContext } from "../../../hooks/useHoverContext";
import { useCameraStore } from "../../../Stores/useCameraStore";

const BillardTriangle: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();
	const { setIsAnyHovered } = useHoverContext();
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
