import React, { useEffect, useMemo, useRef, useState } from "react";
import BambuLabUI from "./BambuLabUI";
import { useControls } from "leva";
import { CustomMeshProps } from "../../../utils/Interfaces";
import { Group, LoopOnce, LoopRepeat } from "three";
import { useCameraStore } from "../../../stores/useCameraStore";
import { useFocusStore } from "../../../stores/useFocusStore";
import { AnimationConfig } from "../../../utils/Types";
import { bambuLabAnimationPresets } from "../../../utils/Presets";
import { useAnimations } from "@react-three/drei";
import useInteraction from "../../../hooks/useInteraction";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import CloseLabel from "../../CloseLabel/CloseLabel";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const bambuLabGroupRef = useRef<Group | null>(null);
	const reverseAnimationRef = useRef(false);

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const { actions } = useAnimations(animations!, bambuLabGroupRef);

	const [action, setAction] = useState<AnimationConfig<"BambuLab">>(bambuLabAnimationPresets.Idle);
	const [doorOpen, setDoorOpen] = useState<boolean>(false);
	const [amsOpen, setAMSOpen] = useState<boolean>(false);

	const interaction = useInteraction({
		onClick: () => {
			if (bambuLabGroupRef.current) {
				setSelectObjectFocus({ name: name, object: bambuLabGroupRef.current });
			}
		},
	});

	const { backLabelPos, backLabelRot, interactionDoorOpenPos, interactionDoorOpenRot, interactionAMSOpenPos, interactionAMSOpenRot } = useControls("BambuLab", {
		backLabelPos: { value: { x: -3.67, y: 2.38, z: 1.57 }, step: 0.01 },
		backLabelRot: { value: { x: 0, y: 2.8, z: 0 }, step: 0.01 },
		interactionDoorOpenPos: { value: { x: -3.65, y: 2.19, z: 1.43 }, step: 0.01 },
		interactionDoorOpenRot: { value: { x: 0, y: 2.69, z: 0 }, step: 0.01 },
		interactionAMSOpenPos: { value: { x: -2.43, y: 2.81, z: 2.12 }, step: 0.01 },
		interactionAMSOpenRot: { value: { x: 0, y: -2.76, z: 0 }, step: 0.01 },
	});

	useEffect(() => {
		const playAction = () => {
			if (action.action === "Idle") return;
			const animation = actions[action.action];
			if (!animation) return;

			if (reverseAnimationRef.current) {
				animation.time = animation.getClip().duration;
				animation.timeScale = -1;
			} else {
				animation.reset();
				animation.timeScale = 1;
			}

			animation.paused = false;
			animation.setLoop(action.options.loop ? LoopRepeat : LoopOnce, action.options.loopCount);
			animation.clampWhenFinished = true;
			animation.play();
		};

		playAction();
		setAction(bambuLabAnimationPresets.Idle);
	}, [action.action, action.options.loop, action.options.loopCount, actions]);

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const switchDoorAnimation = () => {
		reverseAnimationRef.current = doorOpen;

		setAction({
			action: "BambuOpen",
			options: { loop: false, loopCount: 1 },
		});

		setDoorOpen((open) => !open);
	};

	const switchAMSAnimation = () => {
		reverseAnimationRef.current = amsOpen;

		setAction({
			action: "AMSOpen",
			options: { loop: false, loopCount: 1 },
		});

		setAMSOpen((open) => !open);
	};

	const uiComponentProps = useMemo(
		() => ({
			data: { myData: { name, nodes, selectObjectFocus, hovered: interaction.hovered } },
			functions: { myFunctions: { events: interaction.events } },
			refs: { myRefs: { bambuLabGroupRef } },
		}),
		[interaction.events, interaction.hovered, name, nodes, selectObjectFocus],
	);
	return (
		<>
			<BambuLabUI props={uiComponentProps} />
			<CloseLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				scaleFactor={0.16}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>
			<InteractionLabel
				focusName={name}
				shortcut={1}
				label={doorOpen ? "Close Door" : "Open Door"}
				position={[interactionDoorOpenPos.x, interactionDoorOpenPos.y, interactionDoorOpenPos.z]}
				rotation={[interactionDoorOpenRot.x, interactionDoorOpenRot.y, interactionDoorOpenRot.z]}
				scale={0.7}
				onTrigger={() => switchDoorAnimation()}
			/>

			<InteractionLabel
				focusName={name}
				shortcut={2}
				label={doorOpen ? "Close AMS" : "Open AMS"}
				position={[interactionAMSOpenPos.x, interactionAMSOpenPos.y, interactionAMSOpenPos.z]}
				rotation={[interactionAMSOpenRot.x, interactionAMSOpenRot.y, interactionAMSOpenRot.z]}
				scale={0.7}
				onTrigger={() => switchAMSAnimation()}
			/>
		</>
	);
};

export default BambuLab;
