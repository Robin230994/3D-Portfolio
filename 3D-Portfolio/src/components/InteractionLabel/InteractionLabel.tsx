import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useCameraStore } from "../../Stores/useCameraStore";
import { useFocusStore } from "../../Stores/useFocusStore";

export interface InteractionLabelProps {
	focusName: string;
	shortcut: number;
	label: string;
	position: [number, number, number];
	rotation?: [number, number, number];
	scale?: number;
	onTrigger: () => void;
}

const InteractionLabel: React.FC<InteractionLabelProps> = ({ focusName, shortcut, label, position, rotation = [0, 0, 0], scale = 1, onTrigger }) => {
	const focusedObject = useFocusStore((state) => state.selectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const isVisible = focusedObject?.name === focusName && !cameraIsMoving;
	const [renderLabel, setRenderLabel] = useState(isVisible);
	const [isLeaving, setIsLeaving] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setIsLeaving(false);
			setRenderLabel(true);
			return;
		}

		if (!renderLabel) return;
		setIsLeaving(true);
		const hideLabel = window.setTimeout(() => setRenderLabel(false), 180);
		return () => window.clearTimeout(hideLabel);
	}, [isVisible, renderLabel]);

	useEffect(() => {
		const triggerFromKeyboard = (event: KeyboardEvent) => {
			if (!isVisible || event.key !== String(shortcut)) return;

			const target = event.target as HTMLElement | null;
			if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

			event.preventDefault();
			onTrigger();
		};

		window.addEventListener("keydown", triggerFromKeyboard);
		return () => window.removeEventListener("keydown", triggerFromKeyboard);
	}, [isVisible, onTrigger, shortcut]);

	if (!renderLabel) return null;

	return (
		<Html transform sprite position={position} rotation={rotation} scale={scale} distanceFactor={1} pointerEvents="auto">
			<button
				className={`interaction-label ${isLeaving ? "is-leaving" : ""}`}
				onPointerDown={(event) => event.stopPropagation()}
				onClick={(event) => {
					event.stopPropagation();
					onTrigger();
				}}>
				<span className="interaction-label-key">{shortcut}</span>
				<span className="interaction-label-text">{label}</span>
			</button>
		</Html>
	);
};

export default InteractionLabel;
