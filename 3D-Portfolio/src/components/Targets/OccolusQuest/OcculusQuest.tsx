import React, { useRef } from "react";
import OcculusQuestUI from "./OcculusQuestUI";

import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import useInteraction from "../../../hooks/useInteraction";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusStore();
	const { cameraIsMoving } = useCameraStore();
	const interaction = useInteraction({
		onClick: () => {
			if (occulusRef.current) {
				setSelectObjectFocus({ name: name, object: occulusRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const occulusRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving, hovered: interaction.hovered } },
		functions: { myFunctions: { dispatch, events: interaction.events } },
		refs: { myRefs: { occulusRef } },
	};
	return <OcculusQuestUI props={uiComponentProps} />;
};

export default OcculusQuest;
