import React, { useCallback, useMemo, useRef } from "react";
import PaintingBoardUI from "./PaintingBoardUI";
import useInteraction from "../../hooks/useInteraction";
import { CustomMeshProps } from "../../utils/Interfaces";
import { useFocusStore } from "../../Stores/useFocusStore";
import { Mesh } from "three";
import { useCameraStore } from "../../Stores/useCameraStore";
import { useControls } from "leva";
import CloseLabel from "../CloseLabel/CloseLabel";

const PaintingBoard: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const paintingBoardRef = useRef<Mesh>(null);

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const interaction = useInteraction({
		onClick: () => {
			if (!paintingBoardRef.current) return;
			setSelectObjectFocus({ name: name, object: paintingBoardRef.current });
		},
	});

	const dispatch = useCallback(() => {
		setSelectObjectFocus(null);
	}, [setSelectObjectFocus]);

	const { backLabelPos, backLabelRot } = useControls("PaintingBoard", {
		backLabelPos: { value: { x: -0.08, y: 1.15, z: 1.67 }, step: 0.01 },
		backLabelRot: { value: { x: 1.56, y: 3.14, z: 0.1 }, step: 0.01 },
	});

	console.log(interaction.hovered);

	const uiComponentProps = useMemo(
		() => ({
			data: {
				myData: { name, nodes, selectObjectFocus, hovered: interaction.hovered },
			},
			functions: { myFunctions: { events: interaction.events } },
			refs: { myRefs: { paintingBoardRef } },
		}),
		[name, nodes, selectObjectFocus, interaction.hovered, interaction.events],
	);
	return (
		<>
			<PaintingBoardUI props={uiComponentProps} />
			<CloseLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				scaleFactor={0.18}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>
		</>
	);
};

export default PaintingBoard;
