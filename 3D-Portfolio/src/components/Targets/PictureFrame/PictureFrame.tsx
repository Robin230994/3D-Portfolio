import React, { useRef } from "react";
import PictureFrameUI from "./PictureFrameUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { Mesh } from "three";
import useInteraction from "../../../hooks/useInteraction";

const PictureFrame: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const interaction = useInteraction({
		onClick: () => {
			if (pictureFrameRef.current) {
				setSelectObjectFocus({ name: name, object: pictureFrameRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const pictureFrameRef = useRef<Mesh>(null);

	const uiComponentProps = {
		data: {
			myData: { name, nodes, cameraIsMoving, hovered: interaction.hovered },
		},
		functions: {
			myFunctions: {
				events: interaction.events,
				dispatch,
			},
		},
		refs: {
			myRefs: {
				pictureFrameRef,
			},
		},
	};
	return <PictureFrameUI props={uiComponentProps} />;
};

export default PictureFrame;
