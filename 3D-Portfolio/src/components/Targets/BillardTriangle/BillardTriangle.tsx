import React, { useRef } from "react";
import BillardTriangleUI from "./BillardTriangleUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { useCameraContext } from "../../../hooks/useCameraContext";
import { Group } from "three";

const BillardTriangle: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusContext();
	const { cameraIsMoving } = useCameraContext();

	const triangleRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { setSelectObjectFocus } },
		refs: { myRefs: { triangleRef } },
	};
	return <BillardTriangleUI props={uiComponentProps} />;
};

export default BillardTriangle;
