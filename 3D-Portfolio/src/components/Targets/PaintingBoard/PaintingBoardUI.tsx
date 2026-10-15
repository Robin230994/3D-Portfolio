import { FC, memo, RefObject, useEffect, useMemo } from "react";
import { DirectionalLight, Mesh, Object3D, Object3DEventMap, Group, CanvasTexture, MeshStandardMaterial } from "three";
import { IUIComponentProps } from "../../../utils/Types";
import { Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

interface PaintingBoardUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hovered: string | null;
				figureSelected: boolean;
				brushPickedUp: boolean;
				selectObjectFocus: {
					name: string;
					object: Object3D<Object3DEventMap>;
				} | null;
			};
		};
		functions: {
			myFunctions: {
				handleBrushPointerMove: (event: ThreeEvent<PointerEvent>) => void;
				startFigureRotation: (event: ThreeEvent<PointerEvent>) => void;
				rotateFigure: (event: ThreeEvent<PointerEvent>) => void;
				stopFigureRotation: (event: ThreeEvent<PointerEvent>) => void;
				startPainting: () => void;
				paintFigure: (event: ThreeEvent<PointerEvent>, paintContext: CanvasRenderingContext2D, paintTexture: CanvasTexture) => void;
				stopPainting: () => void;
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
				brushRef: RefObject<Mesh>;
				activeFigureRef: RefObject<Group>;
			};
		};
	};
}

const PaintingBoardUI: FC<PaintingBoardUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, hovered, selectObjectFocus, figureSelected, brushPickedUp } = myData;
	const { events, handleBrushPointerMove, startFigureRotation, rotateFigure, stopFigureRotation, startPainting, paintFigure, stopPainting } = myFunctions;
	const { paintingBoardRef, brushRef, activeFigureRef } = myRefs;

	const PaintingBoard: Mesh = nodes["PaintingBoard"] as Mesh;
	const Brush: Mesh = nodes["Brush"] as Mesh;
	const PaintingFigure01: Mesh = nodes["PaintingFigure01"] as Mesh;

	const figureMaterial = PaintingFigure01.material as MeshStandardMaterial;
	const clonedFigureMaterial = useMemo(() => figureMaterial.clone(), [figureMaterial]);
	const { paintCanvas, paintContext, paintTexture } = useMemo(() => {
		const sourceTexture = figureMaterial.map;
		const sourceImage = sourceTexture?.image as { width?: number; height?: number } | undefined;
		const canvas = document.createElement("canvas");
		canvas.width = sourceImage?.width ?? 2048;
		canvas.height = sourceImage?.height ?? 2048;

		const context = canvas.getContext("2d")!;
		const texture = new CanvasTexture(canvas);

		if (sourceTexture) {
			texture.colorSpace = sourceTexture.colorSpace;
			texture.flipY = sourceTexture.flipY;
			texture.wrapS = sourceTexture.wrapS;
			texture.wrapT = sourceTexture.wrapT;
			texture.repeat.copy(sourceTexture.repeat);
			texture.offset.copy(sourceTexture.offset);
			texture.center.copy(sourceTexture.center);
			texture.rotation = sourceTexture.rotation;
		}

		return { paintCanvas: canvas, paintContext: context, paintTexture: texture };
	}, [figureMaterial]);

	useEffect(() => {
		// Copy the figures material and baked map to the paintable canvas
		const sourceImage = figureMaterial.map?.image as CanvasImageSource | undefined;
		if (!sourceImage) return;

		paintContext.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
		paintContext.drawImage(sourceImage, 0, 0, paintCanvas.width, paintCanvas.height);
		clonedFigureMaterial.map = paintTexture;
		clonedFigureMaterial.needsUpdate = true;
		paintTexture.needsUpdate = true;
	}, [clonedFigureMaterial, figureMaterial.map, paintCanvas, paintContext, paintTexture]);

	useEffect(() => {
		return () => {
			clonedFigureMaterial.dispose();
			paintTexture.dispose();
		};
	}, [clonedFigureMaterial, paintTexture]);

	return (
		<group name={name} onPointerMove={handleBrushPointerMove}>
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

			{/** Painting Figures */}
			<group position={[PaintingFigure01.position.x, PaintingFigure01.position.y + 0.07, PaintingFigure01.position.z]} ref={activeFigureRef}>
				<mesh
					name="Blacksmith"
					geometry={PaintingFigure01.geometry}
					rotation={PaintingFigure01.rotation}
					scale={1.8}
					material={clonedFigureMaterial}
					{...events}
					onPointerDown={brushPickedUp ? startPainting : startFigureRotation}
					onPointerMove={(event: ThreeEvent<PointerEvent>) => {
						if (brushPickedUp) {
							paintFigure(event, paintContext, paintTexture);
						}
						rotateFigure(event);
					}}
					onPointerUp={brushPickedUp ? stopPainting : stopFigureRotation}
					onPointerCancel={brushPickedUp ? stopPainting : stopFigureRotation}>
					<Outlines
						thickness={2}
						scale={hovered === "Blacksmith" && selectObjectFocus?.name === name && !figureSelected && !brushPickedUp ? 1 : 0}
						color={"white"}
					/>
				</mesh>
			</group>

			{/** rotation group */}
			<group position={PaintingFigure01.position} visible={figureSelected} raycast={() => null}>
				{/** ring around the figure to indicate rotation behavior */}
				<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
					<torusGeometry args={[0.2, 0.008, 8, 32]} />
					<meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
				</mesh>
			</group>

			{/** helper mesh to prevent specific pointer position to show outlines */}
			<mesh name="Brush" visible={false} position={[-1.25, 1.18, 1.95]} rotation={[1.52, -3.16, 0.2]} {...events}>
				<planeGeometry args={[0.2, 0.5]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>

			{/* Brush */}
			<mesh
				name="Brush"
				ref={brushRef}
				geometry={Brush.geometry}
				position={Brush.position}
				rotation={Brush.rotation}
				scale={Brush.scale}
				material={Brush.material}>
				<Outlines thickness={2} scale={hovered === "Brush" && selectObjectFocus?.name === name ? 1 : 0} color={"white"} />
			</mesh>
		</group>
	);
};

export default memo(PaintingBoardUI);
