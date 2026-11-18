import React from "react";
import { IUIComponentProps } from "../../../utils/Types";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { Material, MeshStandardMaterial } from "three";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { Detailed } from "@react-three/drei";
import { folder, useControls } from "leva";

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

const LiLogoMaterial = new MeshStandardMaterial({ color: "#004182", emissive: "#004182", emissiveIntensity: 1 });
const gitLogoMaterial = new MeshStandardMaterial({ color: "#230d3d", emissive: "#230d3d", emissiveIntensity: 1 });
const LiBGMaterial = new MeshStandardMaterial({ color: "#0A66C2", emissive: "#0A66C2", emissiveIntensity: 10 });
const GitBGMaterial = new MeshStandardMaterial({ color: "#D5D0DA", emissive: "#42106E", emissiveIntensity: 10 });

const LogosUI: React.FC<LogosUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, hovered } = myData;
	const { events } = myFunctions;
	const { linkedInLogoRef, githubLogoRef } = myRefs;

	const LinkedInLogo = nodes["linkedInLogo"] as Mesh;
	const LinkedInBG = nodes["Logo_BG_Li"] as Mesh;
	const GitHubLogo = nodes["GithubLogo"] as Mesh;
	const GithubBG = nodes["Logo_BG_Git"] as Mesh;
	const GithubLogoLP = nodes["GithubLogo_LP"] as Mesh;

	const {
		logoPLLinkedInPosition,
		logoPLLinkedInIntensity,
		logoPLLinkedInDistance,
		logoPLLinkedInDecay,
		logoPLGitPosition,
		logoPLGitIntensity,
		logoPLGitDistance,
		logoPLGitDecay,
	} = useControls("Lights", {
		LinkedInLogo: folder({
			logoPLLinkedInPosition: { value: { x: 3.8, y: 3.3, z: -2.9 }, step: 0.1 },
			logoPLLinkedInIntensity: { value: 4.6, step: 0.1 },
			logoPLLinkedInDistance: { value: 1, step: 0.1 },
			logoPLLinkedInDecay: { value: 0.8, step: 0.1 },
		}),

		GithubLogo: folder({
			logoPLGitPosition: { value: { x: 4.65, y: 3.3, z: -2.8 }, step: 0.01 },
			logoPLGitIntensity: { value: 4.6, step: 0.1 },
			logoPLGitDistance: { value: 1, step: 0.1 },
			logoPLGitDecay: { value: 2.5, step: 0.1 },
		}),
	});

	return (
		<group name={name}>
			<mesh
				name="LinkedInLogo"
				ref={linkedInLogoRef}
				geometry={LinkedInLogo.geometry}
				position={LinkedInLogo.position}
				rotation={LinkedInLogo.rotation}
				scale={hovered === "LinkedInLogo" ? 1.2 : 1}
				material={LiLogoMaterial}
				{...events}
			/>

			<mesh geometry={LinkedInBG.geometry} position={LinkedInBG.position} scale={LinkedInBG.scale} material={LiBGMaterial} />

			<group position={GitHubLogo.position} rotation={GitHubLogo.rotation} scale={hovered === "GitHubLogo" ? 1.2 : 1}>
				<Detailed distances={[0, 5]}>
					<mesh name="GitHubLogo" ref={githubLogoRef} geometry={GitHubLogo.geometry} {...events} material={gitLogoMaterial} />
					<mesh name="GitHubLogo" ref={githubLogoRef} geometry={GithubLogoLP.geometry} {...events} material={gitLogoMaterial} />
				</Detailed>
			</group>

			<mesh geometry={GithubBG.geometry} position={GithubBG.position} scale={GithubBG.scale} material={GitBGMaterial} />

			<pointLight
				intensity={logoPLLinkedInIntensity}
				position={[logoPLLinkedInPosition.x, logoPLLinkedInPosition.y, logoPLLinkedInPosition.z]}
				color={"#0A66C2"}
				distance={logoPLLinkedInDistance}
				decay={logoPLLinkedInDecay}
			/>

			<pointLight
				intensity={logoPLGitIntensity}
				position={[logoPLGitPosition.x, logoPLGitPosition.y, logoPLGitPosition.z]}
				color={"#230d3d"}
				distance={logoPLGitDistance}
				decay={logoPLGitDecay}
			/>
		</group>
	);
};

export default LogosUI;
