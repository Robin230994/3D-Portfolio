import React, { useEffect, useRef, useState } from "react";
import OfficeChairUI from "./OfficeChairUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { LoopOnce, Mesh } from "three";
import { useAnimations } from "@react-three/drei";
import { AnimationConfig } from "../../../types/GLTypes";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { officeChairPresets } from "../../../Presets/Presets";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const [action, setAction] = useState<AnimationConfig<"MyOfficeChair">>(officeChairPresets.Idle);
	const upperChairRef = useRef<Mesh | null>(null);

	const { selectObjectFocus, hoveredObject, setHoveredObject } = useFocusStore();
	const { actions } = useAnimations(animations!, upperChairRef);

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
		setAction(officeChairPresets.Idle);
	}, [action, actions, animations]);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, animations, hoveredObject } },
		functions: { myFunctions: { setAction, setHoveredObject } },
		refs: { myRefs: { upperChairRef } },
	};

	return <OfficeChairUI props={uiComponentProps} />;
};

export default OfficeChair;
