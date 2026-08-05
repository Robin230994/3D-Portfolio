import React, { useRef } from "react";
import MacbookUI from "./MacbookUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import useInteraction from "../../../hooks/useInteraction";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, setSelectObjectFocus } = useFocusStore();
	const { cameraIsMoving } = useCameraStore();

	const interaction = useInteraction({
		onClick: () => {
			if (macbookRef.current) {
				setSelectObjectFocus({ name: name, object: macbookRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const macbookRef = useRef<Group>(null);

	const uiComponentProps = {
		data: {
			myData: {
				name,
				nodes,
				selectObjectFocus,
				cameraIsMoving,
				hovered: interaction.hovered,
			},
		},
		functions: { myFunctions: { dispatch, events: interaction.events } },
		refs: { myRefs: { macbookRef } },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
