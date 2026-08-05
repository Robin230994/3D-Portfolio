import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";

import React, { useRef } from "react";
import FCBoxUI from "./FCBoxUI";
import useInteraction from "../../../hooks/useInteraction";

const FCBox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusStore();
	const { cameraIsMoving } = useCameraStore();
	const interaction = useInteraction({
		onClick: () => {
			if (fcBoxRef.current) {
				setSelectObjectFocus({ name: name, object: fcBoxRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const fcBoxRef = useRef<Group | null>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, cameraIsMoving, hovered: interaction.hovered } },
		functions: { myFunctions: { dispatch, events: interaction.events } },
		refs: { myRefs: { fcBoxRef } },
	};
	return <FCBoxUI props={uiComponentProps} />;
};

export default FCBox;
