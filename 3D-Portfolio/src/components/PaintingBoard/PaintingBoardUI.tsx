import { FC, memo, RefObject } from "react";
import { DirectionalLight, Mesh, Object3D, Object3DEventMap } from "three";
import { IUIComponentProps } from "../../utils/Types";
import { Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

interface PaintingBoardUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hovered: string | null;
				selectObjectFocus: {
					name: string;
					object: Object3D<Object3DEventMap>;
				} | null;
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
				paintingBoardRef: RefObject<Mesh>;
			};
		};
	};
}

const PaintingBoardUI: FC<PaintingBoardUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, hovered, selectObjectFocus } = myData;
	const { events } = myFunctions;
	const { paintingBoardRef } = myRefs;

	const PaintingBoard: Mesh = nodes["PaintingBoard"] as Mesh;
	const Brush: Mesh = nodes["Brush"] as Mesh;

	return (
		<group name={name}>
			{/* Painting Board */}
			<mesh
				name={name}
				ref={paintingBoardRef}
				geometry={PaintingBoard.geometry}
				position={PaintingBoard.position}
				rotation={PaintingBoard.rotation}
				material={PaintingBoard.material}
				scale={PaintingBoard.scale}
				{...events}>
				<Outlines thickness={2} scale={hovered === name && selectObjectFocus?.name !== name ? 1 : 0} color={"white"} />
			</mesh>

			{/** helper mesh to prevent specific pointer position to show outlines */}
			<mesh name="Brush" visible={false} position={[-1.25, 1.18, 1.95]} rotation={[1.52, -3.16, 0.2]} {...events}>
				<planeGeometry args={[0.2, 0.5]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>

			{/* Brush */}
			<mesh name="Brush" geometry={Brush.geometry} position={Brush.position} rotation={Brush.rotation} scale={Brush.scale} material={Brush.material}>
				<Outlines thickness={2} scale={hovered === "Brush" && selectObjectFocus?.name === name ? 1 : 0} color={"white"} />
			</mesh>
		</group>
	);
};

export default memo(PaintingBoardUI);
