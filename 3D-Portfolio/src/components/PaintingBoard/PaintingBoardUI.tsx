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

	return (
		<group name={name} {...events}>
			{/* Painting Board */}
			<mesh
				name={name}
				ref={paintingBoardRef}
				geometry={PaintingBoard.geometry}
				position={PaintingBoard.position}
				rotation={PaintingBoard.rotation}
				material={PaintingBoard.material}
				scale={PaintingBoard.scale}>
				<Outlines thickness={2} scale={hovered === name && selectObjectFocus?.name !== name ? 1 : 0} color={"white"} />
			</mesh>
		</group>
	);
};

export default memo(PaintingBoardUI);
