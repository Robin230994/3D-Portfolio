import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { iot2Material } from "../../../Helper/GLMaterials";
import { Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

interface HomePodUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hovered: boolean;
			};
		};
		functions: {
			myFunctions: {
				events: {
					onPointerEnter: () => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
			};
		};
		refs: { myRefs: object };
	};
}

const HomePodUI: React.FC<HomePodUIProps> = ({ props }) => {
	console.log("Rendering HomePodUI with props:");
	const { myData } = props.data;
	const { myFunctions } = props.functions;

	const { name, nodes, hovered } = myData;
	const { events } = myFunctions;

	const HomePod = nodes["HomePod"] as Mesh;

	return (
		<group name={name} {...events}>
			<mesh geometry={HomePod.geometry} position={HomePod.position} rotation={HomePod.rotation} scale={HomePod.scale} material={iot2Material}>
				<Outlines thickness={2} scale={hovered ? 1 : 0} color={"white"} />
			</mesh>
		</group>
	);
};

export default HomePodUI;
