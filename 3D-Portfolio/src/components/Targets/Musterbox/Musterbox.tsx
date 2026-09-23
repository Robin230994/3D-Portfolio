import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { AnimationAction, Group, LoopOnce, MathUtils, Mesh } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useProjectPanelStore } from "../../../Stores/useProjectPanelStore";
import { useAnimations } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import MusterboxUI from "./MusterboxUI";
import useInteraction from "../../../hooks/useInteraction";
import CloseLabel from "../../CloseLabel/CloseLabel";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

const Musterbox: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	/** REFS */
	const musterboxRef = useRef<Group>(null);
	const hasOpenedRef = useRef(false);
	const currentRaisedBox = useRef<Mesh | null>(null);
	const pendingRaisedBox = useRef<Mesh | null>(null);
	const boxBaseYPositions = useRef(new WeakMap<Mesh, number>());
	const boxBaseZPositions = useRef(new WeakMap<Mesh, number>());
	const movingBoxTargets = useRef(new Map<Mesh, number>());

	/** HOOKS */
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const panelClosed = useProjectPanelStore((state) => state.panelClosed);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const setPanelClosed = useProjectPanelStore((state) => state.setPanelClosed);
	const setActiveProject = useProjectPanelStore((state) => state.setActiveProject);
	const { actions } = useAnimations(animations!, musterboxRef);

	const { backLabelPos, backLabelRot } = useControls("Musterbox", {
		backLabelPos: { value: { x: -3.75, y: 2.2, z: -2.4 }, step: 0.1 },
		backLabelRot: { value: { x: -1.6, y: 0, z: 0.1 }, step: 0.1 },
	});

	/** STATES */
	const [isOpen, setIsOpen] = useState(false);
	const [boxesVisible, setBoxesVisible] = useState(false);
	const [hoveredBox, setHoveredBox] = useState<Mesh | null>(null);

	/** FUNCTIONS */

	const dispatch = () => {
		setSelectObjectFocus(null);
		setActiveProject(null);
	};

	const toggleBox = useCallback(() => setIsOpen((open) => !open), []);
	const switchPanel = useCallback(() => setPanelClosed(!panelClosed), [panelClosed, setPanelClosed]);
	const handleMusterboxClick = useCallback(() => {
		if (musterboxRef.current) {
			setSelectObjectFocus({ name: name, object: musterboxRef.current });
			setActiveProject("Musterbox");
		}
	}, [name, setActiveProject, setSelectObjectFocus]);

	const getBoxBaseY = useCallback((box: Mesh) => {
		const storedBaseY = boxBaseYPositions.current.get(box);
		if (storedBaseY !== undefined) return storedBaseY;

		const baseY = box.position.y;
		boxBaseYPositions.current.set(box, baseY);
		return baseY;
	}, []);

	const getBoxBaseZ = useCallback((box: Mesh) => {
		const storedBaseZ = boxBaseZPositions.current.get(box);
		if (storedBaseZ !== undefined) return storedBaseZ;

		const baseZ = box.rotation.z;
		boxBaseZPositions.current.set(box, baseZ);
		return baseZ;
	}, []);

	const handleBoxHover = useCallback(
		(event: ThreeEvent<PointerEvent>) => {
			event.stopPropagation();
			const box = event.object as Mesh;
			setHoveredBox((current) => (current === box ? current : box));
		},
		[setHoveredBox],
	);

	const handleBoxClick = useCallback(
		(event: ThreeEvent<MouseEvent>) => {
			event.stopPropagation();
			const clickedBox = event.object as Mesh;

			// Save the original Z rotation before this box starts spinning.
			getBoxBaseZ(clickedBox);

			if (currentRaisedBox.current === clickedBox) {
				// Clicking the raised box again returns it to its original position.
				movingBoxTargets.current.set(clickedBox, getBoxBaseY(clickedBox));
				clickedBox.rotation.z = getBoxBaseZ(clickedBox);
				currentRaisedBox.current = null;
				pendingRaisedBox.current = null;
				setActiveProject("Musterbox");
				return;
			}

			pendingRaisedBox.current = clickedBox;
			if (currentRaisedBox.current) {
				// Finish lowering the previous selection before raising the next one.
				const previousBox = currentRaisedBox.current;
				movingBoxTargets.current.set(previousBox, getBoxBaseY(previousBox));
				previousBox.rotation.z = getBoxBaseZ(previousBox);
				currentRaisedBox.current = null;
				setActiveProject(clickedBox.name);
				return;
			}

			if (movingBoxTargets.current.size === 0) {
				currentRaisedBox.current = clickedBox;
				pendingRaisedBox.current = null;
				movingBoxTargets.current.set(clickedBox, getBoxBaseY(clickedBox) + 0.3);
				setActiveProject(clickedBox.name);
			}
		},
		[getBoxBaseY, getBoxBaseZ, setActiveProject],
	);

	const interaction = useInteraction({
		onClick: handleMusterboxClick,
	});

	const clearBoxHover = useCallback(() => setHoveredBox(null), [setHoveredBox]);

	useFrame((_state, delta) => {
		movingBoxTargets.current.forEach((targetY, box) => {
			box.position.y = MathUtils.damp(box.position.y, targetY, 14, delta);
			if (Math.abs(box.position.y - targetY) < 0.001) {
				box.position.y = targetY;
				movingBoxTargets.current.delete(box);
			}
		});

		if (movingBoxTargets.current.size === 0 && pendingRaisedBox.current && !currentRaisedBox.current) {
			const nextBox = pendingRaisedBox.current;
			pendingRaisedBox.current = null;
			currentRaisedBox.current = nextBox;
			movingBoxTargets.current.set(nextBox, getBoxBaseY(nextBox) + 0.3);
		}
		const raisedBox = currentRaisedBox.current;
		if (raisedBox && !movingBoxTargets.current.has(raisedBox)) {
			raisedBox.rotation.z += delta * 0.5;
		}
	});

	useEffect(() => {
		const animation = actions.MusterboxOpen;
		if (!animation) return;

		if (isOpen) {
			setBoxesVisible(true);
			animation.reset();
			animation.timeScale = 1;
			animation.setLoop(LoopOnce, 1);
			animation.clampWhenFinished = true;
			animation.play();
			hasOpenedRef.current = true;
			return;
		}

		if (!isOpen) {
			pendingRaisedBox.current = null;

			if (currentRaisedBox.current) {
				const raisedBox = currentRaisedBox.current;
				movingBoxTargets.current.set(raisedBox, getBoxBaseY(raisedBox));
				raisedBox.rotation.z = getBoxBaseZ(raisedBox);
				currentRaisedBox.current = null;
			}
		}

		if (!hasOpenedRef.current) return;

		const mixer = animation.getMixer();
		const hideBoxesWhenClosed = (event: { action: AnimationAction }) => {
			if (event.action === animation) {
				setBoxesVisible(false);
				mixer.removeEventListener("finished", hideBoxesWhenClosed);
			}
		};
		mixer.addEventListener("finished", hideBoxesWhenClosed);

		if (!animation.isRunning()) {
			animation.time = animation.getClip().duration;
		}
		animation.paused = false;
		animation.timeScale = -1;
		animation.setLoop(LoopOnce, 1);
		animation.clampWhenFinished = true;
		animation.play();
		hasOpenedRef.current = false;

		return () => mixer.removeEventListener("finished", hideBoxesWhenClosed);
	}, [actions.MusterboxOpen, getBoxBaseY, getBoxBaseZ, isOpen]);

	useEffect(() => {
		const isMusterboxFocused = selectObjectFocus?.name === name;
		if (isMusterboxFocused || !hasOpenedRef.current) return;

		// The isOpen effect reverses the current animation progress.
		setIsOpen(false);
	}, [name, selectObjectFocus]);

	const uiComponentProps = useMemo(
		() => ({
			data: { myData: { name, nodes, boxesVisible, hovered: interaction.hovered, hoveredBox } },
			functions: { myFunctions: { handleBoxHover, clearBoxHover, handleBoxClick, events: interaction.events } },
			refs: { myRefs: { musterboxRef } },
		}),
		[boxesVisible, clearBoxHover, handleBoxClick, handleBoxHover, hoveredBox, interaction.events, interaction.hovered, name, nodes],
	);
	return (
		<>
			<MusterboxUI props={uiComponentProps} />

			<CloseLabel
				scaleFactor={0.15}
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>

			<InteractionLabel
				focusName={name}
				shortcut={1}
				label={!isOpen ? "Open Box" : "Close Box"}
				position={[-2.55, 2.56, -2.51]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={1}
				onTrigger={toggleBox}
			/>

			<InteractionLabel
				focusName={name}
				shortcut={2}
				label={panelClosed ? "Open project description" : "Close project description"}
				position={[-2.489, 2.45, -2.51]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={1}
				onTrigger={switchPanel}
			/>
		</>
	);
};

export default Musterbox;
