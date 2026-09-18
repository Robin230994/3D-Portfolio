import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, DoubleSide, Group, Material, Matrix4, Mesh, ShaderMaterial, Vector3 } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { PivotControls } from "@react-three/drei";

interface MouseUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				ot7Material: Material | Material[];
				axisHelperVisible: boolean;
				mouseAtEdge: { x: { min: boolean; max: boolean }; z: { min: boolean; max: boolean } };
			};
		};
		functions: {
			myFunctions: {
				events: {
					onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
				handleMouseDrag: (localMatrix: Matrix4) => void;
				setAxisHelperVisible: React.Dispatch<React.SetStateAction<boolean>>;
			};
		};
		refs: {
			myRefs: {
				mouseRef: RefObject<Mesh>;
				mousePivotRef: RefObject<Group>;
				axisHelperGroupRef: RefObject<Group>;
				mouseAreaMaterialRef: RefObject<ShaderMaterial>;
				// mouseAtEdgeLimit: React.MutableRefObject<{ x: { min: boolean; max: boolean }; z: { min: boolean; max: boolean } }>;
			};
		};
	};
}

const MOUSE_TRAVEL_X = [-0.15, 0.15];
const MOUSE_TRAVEL_Z = [-0.1, 0.1];

const MouseUI: React.FC<MouseUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, axisHelperVisible, ot7Material, mouseAtEdge } = myData;
	const { events, handleMouseDrag, setAxisHelperVisible } = myFunctions;
	const { mouseRef, mousePivotRef, axisHelperGroupRef, mouseAreaMaterialRef } = myRefs;

	const Mouse: Mesh = nodes["Mouse"] as Mesh;

	useFrame(() => {
		if (!mouseAreaMaterialRef.current) return;
		mouseAreaMaterialRef.current.uniforms.uLeft.value = mouseAtEdge.x.min ? 1.0 : 0;
		mouseAreaMaterialRef.current.uniforms.uRight.value = mouseAtEdge.x.max ? 1.0 : 0;
		mouseAreaMaterialRef.current.uniforms.uTop.value = mouseAtEdge.z.max ? 1.0 : 0;
		mouseAreaMaterialRef.current.uniforms.uBottom.value = mouseAtEdge.z.min ? 1.0 : 0;
	});

	return (
		<group name={name} {...events}>
			<PivotControls
				ref={mousePivotRef}
				anchor={[-2.5, 0, -1]}
				activeAxes={[true, false, true]}
				scale={0.4}
				lineWidth={0.8}
				visible={false}
				translationLimits={[
					[MOUSE_TRAVEL_X[0], MOUSE_TRAVEL_X[1]],
					[0, 0],
					[MOUSE_TRAVEL_Z[0], MOUSE_TRAVEL_Z[1]],
				]}
				onDrag={(localMatrix) => {
					handleMouseDrag(localMatrix);
				}}>
				<mesh
					ref={mouseRef}
					geometry={Mouse.geometry}
					position={Mouse.position}
					rotation={Mouse.rotation}
					scale={Mouse.scale}
					material={ot7Material}
					onPointerOver={() => setAxisHelperVisible(true)}
					onPointerLeave={() => setAxisHelperVisible(false)}
				/>
			</PivotControls>

			<group ref={axisHelperGroupRef} matrixAutoUpdate={false}>
				<arrowHelper
					args={[new Vector3(-1, 0, 0), new Vector3(), 0.12, "#ff0000", 0.04, 0.025]}
					position={[Mouse.position.x - 0.05, Mouse.position.y, Mouse.position.z]}
					visible={axisHelperVisible}
				/>
				<arrowHelper
					args={[new Vector3(0, 0, -1), new Vector3(), 0.12, "#0000ff", 0.04, 0.025]}
					position={[Mouse.position.x, Mouse.position.y, Mouse.position.z - 0.1]}
					visible={axisHelperVisible}
				/>
			</group>

			{/** area borders for visual feedback */}
			<mesh position={[Mouse.position.x, Mouse.position.y + 0.037, Mouse.position.z]} rotation={[-Math.PI / 2, 0, 0]}>
				<boxGeometry args={[0.4, 0.37, 0.1]} />
				<mouseAreaShaderMaterial ref={mouseAreaMaterialRef} transparent side={DoubleSide} depthWrite={false} />
			</mesh>
		</group>
	);
};

export default MouseUI;
