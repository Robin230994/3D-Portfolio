import React, { useEffect, useRef, useState } from "react";
import OfficeChairUI from "./OfficeChairUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../../hooks/useHoverContext";
import { useFocusContext } from "../../../hooks/useFocusContext";
import { LoopOnce, Mesh } from "three";
import { useAnimations } from "@react-three/drei";
import { ActionName } from "../../../types/GLTypes";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const [action, setAction] = useState<ActionName>("Idle");
	const upperChairRef = useRef<Mesh>(null);

	const { selectObjectFocus } = useFocusContext();
	const { setIsAnyHovered } = useHoverContext();
	const { actions } = useAnimations(animations!, upperChairRef);

	useEffect(() => {
		const playAction = () => {
			if (action === "Idle") return;
			const animation = actions[action];
			if (animation) {
				animation.reset();
				animation.setLoop(LoopOnce, 1);
				animation.clampWhenFinished = true;
				animation.play();
			}
		};

		playAction();
		setAction("Idle");
	}, [action, actions, animations]);

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus, animations } },
		functions: { myFunctions: { setIsAnyHovered, setAction } },
		refs: { myRefs: { upperChairRef } },
	};

	return <OfficeChairUI props={uiComponentProps} />;
};

export default OfficeChair;
