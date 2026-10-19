import React from "react";
import { IUIComponentProps } from "../../../utils/Types";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { Material, MeshStandardMaterial } from "three";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { Detailed } from "@react-three/drei";

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
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, materials, hovered } = myData;
	const { events } = myFunctions;
	const { linkedInLogoRef, githubLogoRef } = myRefs;

	const t6Material = materials?.t6Material;

	const LinkedInLogo = nodes["linkedInLogo"] as Mesh;
	const GitHubLogo = nodes["GithubLogo"] as Mesh;
	const GithubLogoLP = nodes["GithubLogo_LP"] as Mesh;

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

			<group position={GitHubLogo.position} rotation={GitHubLogo.rotation} scale={hovered === "GitHubLogo" ? 1.2 : 1}>
				<Detailed distances={[0, 5]}>
					<mesh
						name="GitHubLogo"
						ref={githubLogoRef}
						geometry={GitHubLogo.geometry}
						material={t6Material ? t6Material : new MeshStandardMaterial({ color: "#ff0000" })}
						{...events}
					/>

					<mesh
						name="GitHubLogo"
						ref={githubLogoRef}
						geometry={GithubLogoLP.geometry}
						material={t6Material ? t6Material : new MeshStandardMaterial({ color: "#ff0000" })}
						{...events}
					/>
				</Detailed>
			</group>
		</group>
	);
};

export default LogosUI;
