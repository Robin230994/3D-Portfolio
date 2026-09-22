import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { ArrowHelper, DirectionalLight, DoubleSide, Group, Material, Matrix4, Mesh, ShaderMaterial, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { PivotControls } from "@react-three/drei";

interface MouseUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				ot7Material: Material | Material[];
				mouseAtEdge: { x: { min: boolean; max: boolean }; z: { min: boolean; max: boolean } };
				mouseAreaPosition: { x: number; z: number };
				axisHelperVisible: boolean;
				virtualCursorX: number;
				virtualCursorY: number;
			};
		};
		functions: {
			myFunctions: {
				handleMouseDrag: (localMatrix: Matrix4) => void;
				setAxisHelperVisible: React.Dispatch<React.SetStateAction<boolean>>;
				sendVirtualWheelData: (deltaY: number, cursorX: number, cursorY: number) => void;
			};
		};
		refs: {
			myRefs: {
				mouseRef: RefObject<Mesh>;
				mousePivotRef: RefObject<Group>;
				leftAxisArrowRef: RefObject<ArrowHelper>;
				rightAxisArrowRef: RefObject<ArrowHelper>;
				mouseAreaMaterialRef: RefObject<ShaderMaterial>;
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

	const { name, nodes, ot7Material, mouseAtEdge, mouseAreaPosition, axisHelperVisible, virtualCursorX, virtualCursorY } = myData;
	const { handleMouseDrag, setAxisHelperVisible, sendVirtualWheelData } = myFunctions;
	const { mouseRef, mousePivotRef, leftAxisArrowRef, rightAxisArrowRef, mouseAreaMaterialRef } = myRefs;

	const Mouse: Mesh = nodes["Mouse"] as Mesh;

	useFrame(() => {
		if (!mouseAreaMaterialRef.current) return;

		// adjust uniform according the mouse movement on edges
		mouseAreaMaterialRef.current.uniforms.uLeft.value = mouseAtEdge.x.min ? 1.0 : 0;
		mouseAreaMaterialRef.current.uniforms.uRight.value = mouseAtEdge.x.max ? 1.0 : 0;
		mouseAreaMaterialRef.current.uniforms.uTop.value = mouseAtEdge.z.max ? 1.0 : 0;
		mouseAreaMaterialRef.current.uniforms.uBottom.value = mouseAtEdge.z.min ? 1.0 : 0;
		mouseAreaMaterialRef.current.uniforms.uMousePosition.value.set(mouseAreaPosition.x, mouseAreaPosition.z);
	});

	return (
		<group name={name}>
			<PivotControls
				ref={mousePivotRef}
				anchor={[0, 0, 0]}
				activeAxes={[true, false, true]}
				scale={0.4}
				lineWidth={0.8}
				visible={false}
				translationLimits={[
					[MOUSE_TRAVEL_X[0], MOUSE_TRAVEL_X[1]],
					[0, 0],
					[MOUSE_TRAVEL_Z[0], MOUSE_TRAVEL_Z[1]],
				]}
				onDrag={(localMatrix) => handleMouseDrag(localMatrix)}>
				<mesh
					ref={mouseRef}
					geometry={Mouse.geometry}
					position={Mouse.position}
					rotation={Mouse.rotation}
					scale={Mouse.scale}
					material={ot7Material}
					onPointerEnter={() => {
						setAxisHelperVisible(true);
						document.body.style.cursor = "pointer";
					}}
					onPointerLeave={() => {
						setAxisHelperVisible(false);
						document.body.style.cursor = "default";
					}}
					onWheel={(event) => {
						event.stopPropagation();
						sendVirtualWheelData(event.deltaY, virtualCursorX, virtualCursorY);
					}}
				/>
				<group>
					<arrowHelper
						ref={leftAxisArrowRef}
						args={[new Vector3(-1, 0, 0), new Vector3(), 0.15, "#ff0000", 0.04, 0.025]}
						position={[Mouse.position.x - 0.05, Mouse.position.y, Mouse.position.z]}
						visible={axisHelperVisible}
					/>
					<arrowHelper
						ref={rightAxisArrowRef}
						args={[new Vector3(0, 0, -1), new Vector3(), 0.15, "#0000ff", 0.04, 0.025]}
						position={[Mouse.position.x, Mouse.position.y, Mouse.position.z - 0.1]}
						visible={axisHelperVisible}
					/>
				</group>
			</PivotControls>

			{/** area borders for visual feedback */}
			<mesh position={[Mouse.position.x, Mouse.position.y + 0.037, Mouse.position.z]} rotation={[-Math.PI / 2, 0, 0]}>
				<boxGeometry args={[0.4, 0.37, 0.1]} />
				<mouseAreaShaderMaterial ref={mouseAreaMaterialRef} transparent side={DoubleSide} depthWrite={false} />
			</mesh>
		</group>
	);
};

export default MouseUI;
