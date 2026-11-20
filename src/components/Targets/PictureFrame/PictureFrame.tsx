import React, { memo, useRef } from "react";
import PictureFrameUI from "./PictureFrameUI";
import { CustomMeshProps } from "../../../utils/Interfaces";
import { useFocusStore } from "../../../stores/useFocusStore";
import { useCameraStore } from "../../../stores/useCameraStore";
import { Mesh } from "three";
import { useControls } from "leva";
import useInteraction from "../../../hooks/useInteraction";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import CloseLabel from "../../CloseLabel/CloseLabel";

const PictureFrame: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
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

	const { backLabelPos, backLabelRot, interactionHoverPosition } = useControls(
		"PictureFrame",
		{
			backLabelPos: { value: { x: 1.05, y: 2.75, z: 2.92 }, step: 0.01 },
			backLabelRot: { value: { x: 0, y: Math.PI, z: 0 }, step: 0.01 },
			certificatePos: { value: { x: 1.64, y: 2.78, z: 2.93 }, step: 0.01 },
			interactionHoverPosition: { value: { x: 1.6, y: 3.3, z: 2.8 }, step: 0.01 },
		},
		{ collapsed: true },
	);

	const uiComponentProps = {
		data: {
			myData: { name, nodes, hovered: interaction.hovered },
		},
		functions: {
			myFunctions: {
				events: interaction.events,
			},
		},
		refs: {
			myRefs: {
				pictureFrameRef,
			},
		},
	};
	return (
		<>
			<PictureFrameUI props={uiComponentProps} />

			<CloseLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				scaleFactor={0.2}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>

			<InteractionLabel
				focusName={name}
				hoveredObject={interaction.hovered}
				visibilityMode="hover"
				shortcut={1}
				scale={1.8}
				label={"Inspect"}
				position={[interactionHoverPosition.x, interactionHoverPosition.y, interactionHoverPosition.z]}
				onTrigger={() => {
					if (pictureFrameRef.current) {
						setSelectObjectFocus({ name: name, object: pictureFrameRef.current });
					}
				}}
			/>
		</>
	);
};

export default memo(PictureFrame);
