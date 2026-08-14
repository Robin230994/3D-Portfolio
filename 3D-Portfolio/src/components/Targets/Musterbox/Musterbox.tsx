import React, { useCallback, useEffect, useRef, useState } from "react";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { AnimationAction, Group, LoopOnce, MathUtils, Mesh } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useAnimations } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import MusterboxUI from "./MusterboxUI";
import useInteraction from "../../../hooks/useInteraction";

const Musterbox: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const musterboxRef = useRef<Group>(null);
	const hasOpenedRef = useRef(false);
	const currentRaisedBox = useRef<Mesh | null>(null);
	const pendingRaisedBox = useRef<Mesh | null>(null);
	const boxBaseYPositions = useRef(new WeakMap<Mesh, number>());
	const boxBaseZPositions = useRef(new WeakMap<Mesh, number>());
	const movingBoxTargets = useRef(new Map<Mesh, number>());

	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const { actions } = useAnimations(animations!, musterboxRef);

	const [isOpen, setIsOpen] = useState(false);
	const [boxesVisible, setBoxesVisible] = useState(false);
	const [hoveredBox, setHoveredBox] = useState<Mesh | null>(null);

	const interaction = useInteraction({
		onClick: () => {
			if (musterboxRef.current) {
				setSelectObjectFocus({ name: name, object: musterboxRef.current });
			}
		},
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const toggleBox = useCallback(() => setIsOpen((open) => !open), []);

	const handleBoxHover = useCallback(
		(event: ThreeEvent<PointerEvent>) => {
			event.stopPropagation();
			const box = event.object as Mesh;
			setHoveredBox((current) => (current === box ? current : box));
		},
		[setHoveredBox],
	);

	const clearBoxHover = useCallback(() => setHoveredBox(null), [setHoveredBox]);

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

	const handleBoxClick = useCallback(
		(event: ThreeEvent<MouseEvent>) => {
			event.stopPropagation();
			const clickedBox = event.object as Mesh;
			// Save the original Z rotation before this box starts spinning.
			getBoxBaseZ(clickedBox);

			if (currentRaisedBox.current === clickedBox) {
				// Clicking the raised box again returns it to its original height.
				movingBoxTargets.current.set(clickedBox, getBoxBaseY(clickedBox));
				clickedBox.rotation.z = getBoxBaseZ(clickedBox);
				currentRaisedBox.current = null;
				pendingRaisedBox.current = null;
				return;
			}

			pendingRaisedBox.current = clickedBox;
			if (currentRaisedBox.current) {
				// Finish lowering the previous selection before raising the next one.
				const previousBox = currentRaisedBox.current;
				movingBoxTargets.current.set(previousBox, getBoxBaseY(previousBox));
				previousBox.rotation.z = getBoxBaseZ(previousBox);
				currentRaisedBox.current = null;
				return;
			}

			if (movingBoxTargets.current.size === 0) {
				currentRaisedBox.current = clickedBox;
				pendingRaisedBox.current = null;
				movingBoxTargets.current.set(clickedBox, getBoxBaseY(clickedBox) + 0.3);
			}
		},
		[getBoxBaseY, getBoxBaseZ],
	);

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
	}, [actions, getBoxBaseY, getBoxBaseZ, isOpen]);

	useEffect(() => {
		const isMusterboxFocused = selectObjectFocus?.name === name;
		if (isMusterboxFocused || !hasOpenedRef.current) return;

		// The isOpen effect reverses the current animation progress.
		setIsOpen(false);
	}, [name, selectObjectFocus]);

	const uiComponentProps = {
		data: { myData: { name, nodes, isOpen, boxesVisible, cameraIsMoving, hovered: interaction.hovered, hoveredBox } },
		functions: { myFunctions: { dispatch, toggleBox, handleBoxHover, clearBoxHover, handleBoxClick, events: interaction.events } },
		refs: { myRefs: { musterboxRef } },
	};
	return <MusterboxUI props={uiComponentProps} />;
};

export default Musterbox;
