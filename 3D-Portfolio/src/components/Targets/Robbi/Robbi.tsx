import React, { useEffect, useRef, useState } from "react";
import RobbiUI from "./RobbiUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group, LoopOnce, LoopRepeat } from "three";
import { useAnimations } from "@react-three/drei/core/useAnimations";
import { AnimationConfig } from "../../../types/GLTypes";
import { robbiAnimationPresets } from "../../../Presets/Presets";

const Robbi: React.FC<CustomMeshProps> = ({ name, nodes, materials, animations }) => {
	const rigRef = useRef<Group>(null);
	const { actions } = useAnimations(animations!, rigRef);

	const [action, setAction] = useState<AnimationConfig<"Robbi">>(robbiAnimationPresets.Idle02);
	console.log(actions);

	useEffect(() => {
		const playAction = () => {
			//if (action === "Idle") return;
			const animation = actions[action.action];
			if (animation) {
				animation.reset();
				// animation.setLoop(LoopOnce, 1);
				animation.setLoop(action.options.loop ? LoopRepeat : LoopOnce, action.options.loopCount);
				animation.clampWhenFinished = !action.options.loop;
				animation.play();
			}
		};

		playAction();
		setAction(robbiAnimationPresets.Idle02);

		return () => {
			const animation = actions[action.action];
			if (animation) {
				animation.stop();
			}
		};
	}, [action, actions]);

	const uiComponentProps = {
		data: { myData: { name, nodes, materials, animations } },
		functions: { myFunctions: { setAction } },
		refs: { myRefs: { rigRef } },
	};
	return <RobbiUI props={uiComponentProps} />;
};

export default Robbi;
