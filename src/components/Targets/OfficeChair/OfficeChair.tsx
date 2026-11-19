import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import OfficeChairUI from "./OfficeChairUI";
import { CustomMeshProps } from "../../../utils/Interfaces";
import { Group, LoopOnce } from "three";
import { useAnimations } from "@react-three/drei";
import { AnimationConfig } from "../../../utils/Types";
import { officeChairAnimationPresets } from "../../../utils/Presets";
import { useControls } from "leva";
import useInteraction from "../../../hooks/useInteraction";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const [action, setAction] = useState<AnimationConfig<"OfficeChair">>(officeChairAnimationPresets.Idle);
	const upperChairRef = useRef<Group | null>(null);

	const { actions } = useAnimations(animations!, upperChairRef);

	const handleChairClick = useCallback(() => {
		setAction({
			action: "ChairRotation",
			options: { loop: false, loopCount: 1 },
		});
	}, []);

	const interactions = useInteraction({
		onClick: handleChairClick,
	});

	useEffect(() => {
		const playAction = () => {
			if (action.action === "idle") return;
			const animation = actions[action.action];
			if (animation) {
				animation.reset();
				animation.setLoop(LoopOnce, 1);
				animation.clampWhenFinished = true;
				animation.play();
			}
		};

		playAction();
		setAction(officeChairAnimationPresets.Idle);
	}, [action, actions, animations]);

	const { interactionLabelPos } = useControls("OfficeChair", {
		interactionLabelPos: { value: { x: 5.6, y: 1.4, z: 0.5 }, step: 0.1 },
	});

	const uiComponentProps = useMemo(
		() => ({
			data: { myData: { name, nodes, animations, hovered: interactions.hovered } },
			functions: { myFunctions: { events: interactions.events } },
			refs: { myRefs: { upperChairRef } },
		}),
		[animations, interactions.events, interactions.hovered, name, nodes],
	);

	return (
		<>
			<OfficeChairUI props={uiComponentProps} />
			<InteractionLabel
				focusName={name}
				hoveredObject={interactions.hovered}
				visibilityMode="hover"
				shortcut={1}
				scale={2}
				label={"Spin around"}
				position={[interactionLabelPos.x, interactionLabelPos.y, interactionLabelPos.z]}
				onTrigger={() => handleChairClick()}
			/>
		</>
	);
};

export default OfficeChair;
