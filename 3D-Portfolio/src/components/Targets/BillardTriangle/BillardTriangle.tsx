import React, { useRef } from "react";
import BillardTriangleUI from "./BillardTriangleUI";
import useInteraction from "../../../hooks/useInteraction";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";

const BillardTriangle: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
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
		data: { myData: { name, nodes, cameraIsMoving } },
		functions: { myFunctions: { dispatch, events: interaction.events } },
		refs: { myRefs: { triangleRef } },
	};
	return <BillardTriangleUI props={uiComponentProps} />;
};

export default BillardTriangle;
