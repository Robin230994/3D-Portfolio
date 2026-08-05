import React, { useRef } from "react";
import LogosUI from "./LogosUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Mesh } from "three/src/objects/Mesh.js";
import useInteraction from "../../../hooks/useInteraction";

const Logos: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const interaction = useInteraction({
		onClick: (e) => {
			if (e.object.name === "LinkedInLogo") {
				window.open("https://www.linkedin.com/in/robin-dort-37348a231/", "_blank");
			} else if (e.object.name === "GitHubLogo") {
				window.open("https://github.com/Robin230994", "_blank", "noopener,noreferrer");
			}
		},
	});

	const linkedInLogoRef = useRef<Mesh>(null);
	const githubLogoRef = useRef<Mesh>(null);

	const uiComponentProps = {
		data: {
			myData: { name, nodes, hovered: interaction.hovered, materials },
		},
		functions: {
			myFunctions: {
				events: interaction.events,
			},
		},
		refs: {
			myRefs: {
				linkedInLogoRef,
				githubLogoRef,
			},
		},
	};
	return <LogosUI props={uiComponentProps} />;
};

export default Logos;
