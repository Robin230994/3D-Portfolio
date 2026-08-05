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

	const { name, nodes, materials } = myData;
	const { setHoveredObject } = myFunctions;
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
				onPointerEnter={() => {
					setHoveredObject("LinkedInLogo");
					linkedInLogoRef.current?.scale.setScalar(1.2); // Scale up on hover
				}}
				onPointerLeave={() => {
					setHoveredObject(null);
					linkedInLogoRef.current?.scale.setScalar(1); // Reset scale when not hovering
				}}
				onClick={() => {
					window.open("https://www.linkedin.com/in/robin-dort-37348a231/", "_blank", "noopener, noreferrer");
				}}></mesh>
			<mesh
				name="GitHubLogo"
				ref={githubLogoRef}
				geometry={GitHubLogo.geometry}
				position={GitHubLogo.position}
				rotation={GitHubLogo.rotation}
				material={t6Material ? t6Material : new MeshStandardMaterial({ color: "#ff0000" })}
				onPointerEnter={() => {
					setHoveredObject("GithubLogo");
					githubLogoRef.current?.scale.setScalar(1.2); // Scale up on hover
				}}
				onPointerLeave={() => {
					setHoveredObject(null);
					githubLogoRef.current?.scale.setScalar(1); // Reset scale when not hovering
				}}
				onClick={() => {
					window.open("https://github.com/Robin230994", "_blank", "noopener,noreferrer");
				}}></mesh>
		</group>
	);
};

export default LogosUI;
