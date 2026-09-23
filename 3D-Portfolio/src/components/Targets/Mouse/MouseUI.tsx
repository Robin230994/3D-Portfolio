import React, { MutableRefObject, RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { ArrowHelper, DirectionalLight, DoubleSide, Group, Material, Matrix4, Mesh, ShaderMaterial, Vector3 } from "three";
import { PivotControls } from "@react-three/drei";

interface MouseUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				ot7Material: Material | Material[];
				axisHelperVisible: boolean;
			};
		};
		functions: {
			myFunctions: {
				handleMouseDrag: (localMatrix: Matrix4) => void;
				setAxisHelperVisible: React.Dispatch<React.SetStateAction<boolean>>;
				handleVirtualWheel: (deltaY: number) => void;
				clickVirtualMouse: () => void;
			};
		};
		refs: {
			myRefs: {
				mouseRef: RefObject<Mesh>;
				mousePivotRef: RefObject<Group>;
				leftAxisArrowRef: RefObject<ArrowHelper>;
				rightAxisArrowRef: RefObject<ArrowHelper>;
				mouseAreaMaterialRef: RefObject<ShaderMaterial>;
				mouseIsDragging: MutableRefObject<boolean>;
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

	const { name, nodes, ot7Material, axisHelperVisible } = myData;
	const { handleMouseDrag, setAxisHelperVisible, handleVirtualWheel, clickVirtualMouse } = myFunctions;
	const { mouseRef, mousePivotRef, leftAxisArrowRef, rightAxisArrowRef, mouseAreaMaterialRef, mouseIsDragging } = myRefs;

	const Mouse: Mesh = nodes["Mouse"] as Mesh;

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
				onDragStart={() => (mouseIsDragging.current = true)}
				onDrag={(localMatrix) => handleMouseDrag(localMatrix)}
				onDragEnd={() => (mouseIsDragging.current = false)}>
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
						handleVirtualWheel(event.deltaY);
					}}
					onClick={() => {
						if (!mouseIsDragging.current) clickVirtualMouse();
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
