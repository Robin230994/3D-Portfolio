import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { Material, MeshStandardMaterial } from "three";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";

interface LogosUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hovered: string | null;
				materials?: {
					t6Material?: Material;
				};
			};
		};
		functions: {
			myFunctions: {
				events: {
					onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
			};
		};
		refs: {
			myRefs: {
				linkedInLogoRef: React.RefObject<Mesh>;
				githubLogoRef: React.RefObject<Mesh>;
			};
		};
	};
}

const LogosUI: React.FC<LogosUIProps> = ({ props }) => {
	console.log("Rendering LogosUI with props:");
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, materials, hovered } = myData;
	const { events } = myFunctions;
	const { linkedInLogoRef, githubLogoRef } = myRefs;

	const t6Material = materials?.t6Material;

	const LinkedInLogo = nodes["linkedInLogo"] as Mesh;
	const GitHubLogo = nodes["GithubLogo"] as Mesh;

	return (
		<group name={name}>
			<mesh
				name="LinkedInLogo"
				ref={linkedInLogoRef}
				geometry={LinkedInLogo.geometry}
				position={LinkedInLogo.position}
				rotation={LinkedInLogo.rotation}
				material={t6Material ? t6Material : new MeshStandardMaterial({ color: "#ff0000" })}
				scale={hovered === "LinkedInLogo" ? 1.2 : 1}
				{...events}></mesh>
			<mesh
				name="GitHubLogo"
				ref={githubLogoRef}
				geometry={GitHubLogo.geometry}
				position={GitHubLogo.position}
				rotation={GitHubLogo.rotation}
				material={t6Material ? t6Material : new MeshStandardMaterial({ color: "#ff0000" })}
				scale={hovered === "GitHubLogo" ? 1.2 : 1}
				{...events}></mesh>
		</group>
	);
};

export default LogosUI;
