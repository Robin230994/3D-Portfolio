import React, { useRef } from "react";
import BambuLabUI from "./BambuLabUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import useInteraction from "../../../hooks/useInteraction";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusStore();
	const { cameraIsMoving } = useCameraStore();

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
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving } },
		functions: { myFunctions: { dispatch, events: interaction.events } },
		refs: { myRefs: { bambuLabRef } },
	};
	return <BambuLabUI props={uiComponentProps} />;
};

export default BambuLab;
