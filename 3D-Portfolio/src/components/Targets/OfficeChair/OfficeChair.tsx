import React, { useEffect, useRef, useState } from "react";
import OfficeChairUI from "./OfficeChairUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { LoopOnce, Mesh } from "three";
import { useAnimations } from "@react-three/drei";
import { AnimationConfig } from "../../../types/GLTypes";
import { officeChairAnimationPresets } from "../../../Presets/Presets";
import useInteraction from "../../../hooks/useInteraction";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const [action, setAction] = useState<AnimationConfig<"OfficeChair">>(officeChairAnimationPresets.Idle);
	const upperChairRef = useRef<Mesh | null>(null);

	const { actions } = useAnimations(animations!, upperChairRef);
	const interactions = useInteraction({
		onClick: () => {
			setAction({
				action: "ChairRotation",
				options: { loop: false, loopCount: 1 },
			});
		},
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

	const uiComponentProps = {
		data: { myData: { name, nodes, animations, hovered: interactions.hovered } },
		functions: { myFunctions: { events: interactions.events } },
		refs: { myRefs: { upperChairRef } },
	};

	return <OfficeChairUI props={uiComponentProps} />;
};

export default OfficeChair;
