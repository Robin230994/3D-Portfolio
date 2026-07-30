import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { Material, MeshStandardMaterial } from "three";

interface LogosUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hoveredObject: string | null;
				materials?: {
					t6Material?: Material;
				};
			};
		};
		functions: {
			myFunctions: {
				setHoveredObject: (objectName: string | null) => void;
			};
		};
		refs: {
			myRefs: object;
		};
	};
}

const LogosUI: React.FC<LogosUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;

	const { name, nodes, hoveredObject, materials } = myData;
	const { setHoveredObject } = myFunctions;

	const t6Material = materials?.t6Material;

	const LinkedInLogo = nodes["linkedInLogo"] as Mesh;
	const GitHubLogo = nodes["GithubLogo"] as Mesh;

	return (
		<group name={name}>
			<mesh
				name="LinkedInLogo"
				geometry={LinkedInLogo.geometry}
				position={LinkedInLogo.position}
				rotation={LinkedInLogo.rotation}
				material={t6Material ? t6Material : new MeshStandardMaterial({ color: "#ff0000" })}
				scale={hoveredObject === "LinkedInLogo" ? 1.2 : 1}
				onPointerEnter={() => {
					setHoveredObject("LinkedInLogo");
				}}
				onPointerLeave={() => setHoveredObject(null)}
				onClick={() => {
					window.open("https://www.linkedin.com/in/robin-dort-37348a231/", "_blank", "noopener, noreferrer");
				}}></mesh>
			<mesh
				name="GitHubLogo"
				geometry={GitHubLogo.geometry}
				position={GitHubLogo.position}
				rotation={GitHubLogo.rotation}
				material={t6Material ? t6Material : new MeshStandardMaterial({ color: "#ff0000" })}
				scale={hoveredObject === "GithubLogo" ? 1.2 : 1}
				onPointerEnter={() => {
					setHoveredObject("GithubLogo");
				}}
				onPointerLeave={() => setHoveredObject(null)}
				onClick={() => {
					window.open("https://github.com/Robin230994", "_blank", "noopener,noreferrer");
				}}></mesh>
		</group>
	);
};

export default LogosUI;
