import React, { useRef } from "react";
import WindowUI from "./WindowUI";
import useInteraction from "../../../hooks/useInteraction";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Mesh } from "three";

const Window: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const windowRef = useRef<Mesh | null>(null);
	const interaction = useInteraction({
		onClick: () => {
			setInterval(() => {
				if (!windowRef.current) return;
				windowRef.current.rotation.x = Math.PI;
			}, 500);
		},
	});

	const uiComponentProps = {
		data: {
			myData: { name, nodes, hovered: interaction.hovered },
		},
		functions: { myFunctions: { events: interaction.events } },
		refs: { myRefs: { windowRef } },
	};
	return <WindowUI props={uiComponentProps} />;
};

export default Window;
