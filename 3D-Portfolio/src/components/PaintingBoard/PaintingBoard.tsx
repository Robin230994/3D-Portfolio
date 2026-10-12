import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PaintingBoardUI from "./PaintingBoardUI";
import useInteraction from "../../hooks/useInteraction";
import { CustomMeshProps } from "../../utils/Interfaces";
import { useFocusStore } from "../../Stores/useFocusStore";
import { Euler, Mesh, Vector3, Group } from "three";
import { useCameraStore } from "../../Stores/useCameraStore";
import { useControls } from "leva";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import CloseLabel from "../CloseLabel/CloseLabel";
import InteractionLabel from "../InteractionLabel/InteractionLabel";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const PaintingBoard: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	/** STATES */
	const [figureSelected, setFigureSelected] = useState<boolean>(false);
	const [brushPickedUp, setBrushPickedUp] = useState<boolean>(false);

	/** REFS */
	const paintingBoardRef = useRef<Mesh>(null);
	const brushRef = useRef<Mesh>(null);
	const activeFigureRef = useRef<Group>(null);

	const isRotatingFigure = useRef<boolean>(false);
	const initialBrushPos = useRef<Vector3>(new Vector3());
	const initialBrushRot = useRef<Euler>(new Euler());
	const brushTargetWorld = useRef<Vector3>(new Vector3());
	const brushTargetLocal = useRef<Vector3>(new Vector3());

	/** HOOKS */
	const orbitControls = useThree((state) => state.controls as OrbitControlsImpl | undefined);
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const interaction = useInteraction({
		onClick: (event: ThreeEvent<MouseEvent>) => {
			if (!paintingBoardRef.current) return;
			setSelectObjectFocus({ name: name, object: paintingBoardRef.current });

			if (event.object.name === "Blacksmith") {
				if (event.delta > 4 || brushPickedUp) return;
				event.stopPropagation();
				setFigureSelected(!figureSelected);
			}
		},
	});
	const { backLabelPos, backLabelRot, interactionPickUpPos, interactionPickupRot } = useControls("PaintingBoard", {
		backLabelPos: { value: { x: -0.08, y: 1.15, z: 1.67 }, step: 0.01 },
		backLabelRot: { value: { x: 1.56, y: 3.14, z: 0.1 }, step: 0.01 },
		interactionPickUpPos: { value: { x: -1.31, y: 1.18, z: 1.97 }, step: 0.01 },
		interactionPickupRot: { value: { x: -0.04, y: 1.76, z: 0.02 }, step: 0.01 },
	});

	useEffect(() => {
		if (!brushRef.current) return;
		initialBrushPos.current = brushRef.current.position.clone();
		initialBrushRot.current = brushRef.current.rotation.clone();
	}, []);

	useFrame((_, delta) => {
		if (!brushRef.current || !brushRef.current.parent) return;

		if (brushPickedUp) {
			// Pointer hit points are in world space.
			// The brush position belongs to its parent group’s local space.
			brushTargetLocal.current.copy(brushTargetWorld.current);
			brushRef.current.parent.worldToLocal(brushTargetLocal.current);

			brushRef.current.position.lerp(brushTargetLocal.current, 1 - Math.exp(-18 * delta));
		} else {
			// brush is dropped -> return to original position and rotation
			brushRef.current.position.lerp(initialBrushPos.current, 1 - Math.exp(-18 * delta));
			brushRef.current.rotation.copy(initialBrushRot.current);
		}
	});

	/** FUNCTIONS */

	const dispatch = useCallback(() => {
		setSelectObjectFocus(null);
	}, [setSelectObjectFocus]);

	const handleBrushPointerMove = useCallback(
		(event: ThreeEvent<PointerEvent>) => {
			if (!brushPickedUp) return;
			const closestHit = event.intersections[0];

			//ignore all calls behind the figure to glue the brush to the figure itself
			if (!closestHit || event.object !== closestHit.object) return;

			brushTargetWorld.current.copy(event.point);
			if (closestHit.normal) {
				brushTargetWorld.current.addScaledVector(closestHit.normal, 0.002);
			}

			event.stopPropagation();
		},
		[brushPickedUp],
	);

	const startFigureRotation = useCallback(
		(event: ThreeEvent<PointerEvent>) => {
			if (brushPickedUp) return;

			event.stopPropagation();

			const target = event.target as (EventTarget & { setPointerCapture: (pointerId: number) => void }) | null;
			target?.setPointerCapture(event.pointerId);

			if (orbitControls) orbitControls.enabled = false;
			isRotatingFigure.current = true;
			setFigureSelected(true);
		},
		[brushPickedUp, orbitControls],
	);

	const rotateFigure = useCallback((event: ThreeEvent<PointerEvent>) => {
		if (!isRotatingFigure.current || !activeFigureRef.current) return;

		activeFigureRef.current.rotation.y += event.nativeEvent.movementX * 0.01;
	}, []);

	const stopFigureRotation = useCallback(
		(event: ThreeEvent<PointerEvent>) => {
			const target = event.target as
				| (EventTarget & {
						hasPointerCapture: (pointerId: number) => boolean;
						releasePointerCapture: (pointerId: number) => void;
				  })
				| null;

			if (target?.hasPointerCapture(event.pointerId)) {
				target.releasePointerCapture(event.pointerId);
			}

			isRotatingFigure.current = false;
			if (orbitControls) orbitControls.enabled = true;
		},
		[orbitControls],
	);

	const uiComponentProps = useMemo(
		() => ({
			data: {
				myData: { name, nodes, selectObjectFocus, figureSelected, brushPickedUp, hovered: interaction.hovered },
			},
			functions: {
				myFunctions: { setBrushPickedUp, handleBrushPointerMove, startFigureRotation, rotateFigure, stopFigureRotation, events: interaction.events },
			},
			refs: { myRefs: { paintingBoardRef, brushRef, activeFigureRef } },
		}),
		[
			name,
			nodes,
			selectObjectFocus,
			figureSelected,
			brushPickedUp,
			interaction.hovered,
			interaction.events,
			handleBrushPointerMove,
			startFigureRotation,
			rotateFigure,
			stopFigureRotation,
		],
	);
	return (
		<>
			<PaintingBoardUI props={uiComponentProps} />
			<CloseLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				scaleFactor={0.18}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>
			<InteractionLabel
				focusName={name}
				shortcut={1}
				label={brushPickedUp ? "Drop brush" : "Pick up brush"}
				position={[interactionPickUpPos.x, interactionPickUpPos.y, interactionPickUpPos.z]}
				rotation={[interactionPickupRot.x, interactionPickupRot.y, interactionPickupRot.z]}
				scale={0.8}
				onTrigger={() => {
					if (figureSelected) return;
					setBrushPickedUp(!brushPickedUp);
				}}
			/>
		</>
	);
};

export default PaintingBoard;
