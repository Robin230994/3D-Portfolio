import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { foundationMaterial, glassMaterial } from "../../../Helper/GLMaterials";
import { ThreeEvent } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";

interface WindowUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hovered: string | null;
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
				windowRef: RefObject<Mesh>;
				windowHandleRef: RefObject<Mesh>;
			};
		};
	};
}

const WindowUI: React.FC<WindowUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, hovered } = myData;
	const { events } = myFunctions;
	const { windowRef, windowHandleRef } = myRefs;

	const Window = nodes["Window"] as Mesh;
	const WindowHandle = nodes["WindowHandle"] as Mesh;
	const WindowGlass = nodes["WindowGlass"] as Mesh;

	return (
		<mesh
			ref={windowRef}
			geometry={Window.geometry}
			position={Window.position}
			rotation={Window.rotation}
			scale={Window.scale}
			material={foundationMaterial}
			name={name}
			{...events}>
			{/** The handle's transform is local to the Window */}
			<mesh
				ref={windowHandleRef}
				geometry={WindowHandle.geometry}
				position={WindowHandle.position}
				rotation={WindowHandle.rotation}
				scale={WindowHandle.scale}
				material={foundationMaterial}
				name={name}
			/>

			{/** The glasses transform is local to the Window */}
			<mesh
				geometry={WindowGlass.geometry}
				position={WindowGlass.position}
				rotation={WindowGlass.rotation}
				scale={WindowGlass.scale}
				material={glassMaterial}
				name={name}
			/>

			<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
		</mesh>
	);
};

export default WindowUI;
