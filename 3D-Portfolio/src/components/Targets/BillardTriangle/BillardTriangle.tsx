import React, { useRef } from "react";
import BillardTriangleUI from "./BillardTriangleUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import useInteraction from "../../../hooks/useInteraction";

const BillardTriangle: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusStore();
	const { cameraIsMoving } = useCameraStore();
	const interaction = useInteraction({
		onClick: () => {
			if (triangleRef.current) {
				setSelectObjectFocus({ name: name, object: triangleRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const triangleRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { dispatch, events: interaction.events } },
		refs: { myRefs: { triangleRef } },
	};
	return <BillardTriangleUI props={uiComponentProps} />;
};

export default BillardTriangle;
