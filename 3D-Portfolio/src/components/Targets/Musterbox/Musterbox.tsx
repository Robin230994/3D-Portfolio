import React, { useRef } from "react";
import MusterboxUI from "./MusterboxUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import useInteraction from "../../../hooks/useInteraction";

const Musterbox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);

	const interaction = useInteraction({
		onClick: () => {
			if (musterboxRef.current) {
				setSelectObjectFocus({ name: name, object: musterboxRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const musterboxRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name, nodes, cameraIsMoving, hovered: interaction.hovered } },
		functions: { myFunctions: { dispatch, events: interaction.events } },
		refs: { myRefs: { musterboxRef } },
	};
	return <MusterboxUI props={uiComponentProps} />;
};

export default Musterbox;
