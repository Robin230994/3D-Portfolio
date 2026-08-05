import React, { useRef } from "react";
import BambuLabUI from "./BambuLabUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import useInteraction from "../../../hooks/useInteraction";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);

	const bambuLabRef = useRef<Group | null>(null);

	const interaction = useInteraction({
		onClick: () => {
			if (bambuLabRef.current) {
				setSelectObjectFocus({ name: name, object: bambuLabRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const uiComponentProps = {
		data: { myData: { name, nodes, cameraIsMoving } },
		functions: { myFunctions: { dispatch, events: interaction.events } },
		refs: { myRefs: { bambuLabRef } },
	};
	return <BambuLabUI props={uiComponentProps} />;
};

export default BambuLab;
