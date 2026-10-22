import React, { useCallback, useMemo, useRef } from "react";
import BillardTriangleUI from "./BillardTriangleUI";
import useInteraction from "../../../hooks/useInteraction";
import { CustomMeshProps } from "../../../utils/Interfaces";
import { Group, Mesh } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useControls } from "leva";
import { useProjectPanelStore } from "../../../Stores/useProjectPanelStore";
import { useFrame } from "@react-three/fiber";
import CloseLabel from "../../CloseLabel/CloseLabel";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

const BillardTriangle: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const triangleRef = useRef<Group>(null);
	const ball8Ref = useRef<Mesh>(null);
	const spinningRef = useRef<number | null>(null);
	const initialRotationRef = useRef<number>(0);

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const panelClosed = useProjectPanelStore((state) => state.panelClosed);
	const setPanelClosed = useProjectPanelStore((state) => state.setPanelClosed);
	const setActiveProject = useProjectPanelStore((state) => state.setActiveProject);

	const interaction = useInteraction({
		onClick: () => {
			if (triangleRef.current) {
				setSelectObjectFocus({ name: name, object: triangleRef.current });
				setActiveProject("BillardTriangle");
			}
		},
	});

	const { backLabelPos, backLabelRot, interactionPanelPos, interactionPanelRot, interactionBallPos, interactionBallRot } = useControls("BillardTriangle", {
		backLabelPos: { value: { x: -6.23, y: 2.51, z: -1.51 }, step: 0.01 },
		backLabelRot: { value: { x: -Math.PI / 2, y: 0, z: -1.4 }, step: 0.01 },
		interactionPanelPos: { value: { x: -6.28, y: 2.55, z: -1.7 }, step: 0.01 },
		interactionPanelRot: { value: { x: -0.61, y: 0.87, z: 0.49 }, step: 0.01 },
		interactionBallPos: { value: { x: -6.32, y: 2.53, z: -2.07 }, step: 0.01 },
		interactionBallRot: { value: { x: 0, y: 1.6, z: 0 }, step: 0.01 },
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
		setActiveProject(null);
	};

	const spinBall = useCallback(() => {
		if (!ball8Ref.current) return;
		initialRotationRef.current = ball8Ref.current.rotation.y;
		spinningRef.current = performance.now();
	}, []);

	// easing function to make the ball not spin the same speed all around
	const easeInOutCubic = (t: number) => (t < 0.5 ? 16 * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2);

	useFrame(() => {
		const startTime = spinningRef.current;

		if (!ball8Ref.current || startTime === null) return;

		const duration = 2000; // 2 seconds spin
		const progress = Math.min((performance.now() - startTime) / duration, 1);
		const easedProgress = easeInOutCubic(progress);
		const totalRotation = Math.PI * 4; // 2 full spins

		ball8Ref.current.rotation.y = initialRotationRef.current + totalRotation * easedProgress;

		if (progress == 1) {
			spinningRef.current = null;
		}
	});

	const uiComponentProps = useMemo(() => {
		return {
			data: { myData: { name, nodes, cameraIsMoving, selectObjectFocus, hovered: interaction.hovered } },
			functions: { myFunctions: { events: interaction.events } },
			refs: { myRefs: { triangleRef, ball8Ref } },
		};
	}, [name, nodes, cameraIsMoving, selectObjectFocus, interaction.hovered, interaction.events, triangleRef]);

	return (
		<>
			<BillardTriangleUI props={uiComponentProps} />
			<CloseLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				scaleFactor={0.18}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>

			<InteractionLabel
				focusName={name}
				shortcut={1}
				label={"Spin Ball"}
				position={[interactionBallPos.x, interactionBallPos.y, interactionBallPos.z]}
				rotation={[interactionBallRot.x, interactionBallRot.y, interactionBallRot.z]}
				scale={0.7}
				onTrigger={spinBall}
			/>

			<InteractionLabel
				focusName={name}
				shortcut={2}
				label={panelClosed ? "Open project description" : "Close project description"}
				position={[interactionPanelPos.x, interactionPanelPos.y, interactionPanelPos.z]}
				rotation={[interactionPanelRot.x, interactionPanelRot.y, interactionPanelRot.z]}
				scale={0.7}
				onTrigger={() => setPanelClosed(true)}
			/>
		</>
	);
};

export default BillardTriangle;
