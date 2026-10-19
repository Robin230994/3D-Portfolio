import React, { useMemo, useRef } from "react";
import OcculusQuestUI from "./OcculusQuestUI";

import { CustomMeshProps } from "../../../utils/Interfaces";
import { Group } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useControls } from "leva";
import useInteraction from "../../../hooks/useInteraction";
import CloseLabel from "../../CloseLabel/CloseLabel";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const occulusRef = useRef<Group>(null);

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const interaction = useInteraction({
		onClick: () => {
			if (occulusRef.current) {
				setSelectObjectFocus({ name: name, object: occulusRef.current });
			}
		},
	});

	const { backLabelPos, backLabelRot } = useControls("OcculusHeadset", {
		backLabelPos: { value: { x: 2.98, y: 1.16, z: -1.37 }, step: 0.01 },
		backLabelRot: { value: { x: -1.6, y: 0, z: 0.3 }, step: 0.01 },
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const uiComponentProps = useMemo(() => {
		return {
			data: { myData: { name, nodes, hovered: interaction.hovered } },
			functions: { myFunctions: { events: interaction.events } },
			refs: { myRefs: { occulusRef } },
		};
	}, [interaction.events, interaction.hovered, name, nodes]);
	return (
		<>
			<OcculusQuestUI props={uiComponentProps} />
			<CloseLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				scaleFactor={0.2}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>
		</>
	);
};

export default OcculusQuest;
