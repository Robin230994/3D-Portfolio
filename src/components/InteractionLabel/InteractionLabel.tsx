import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useCameraStore } from "../../stores/useCameraStore";
import { useFocusStore } from "../../stores/useFocusStore";

type VisibilityMode = "focus" | "hover";

export interface InteractionLabelProps {
	focusName: string;
	shortcut: number;
	label: string;
	position: [number, number, number];
	visibilityMode?: VisibilityMode;
	hoveredObject?: string | null;
	rotation?: [number, number, number];
	scale?: number;
	staticCameraMovement?: boolean;
	onTrigger: () => void;
}

const InteractionLabel: React.FC<InteractionLabelProps> = ({
	focusName,
	shortcut,
	label,
	position,
	visibilityMode = "focus",
	hoveredObject,
	rotation = [0, 0, 0],
	scale = 1,
	staticCameraMovement = false,
	onTrigger,
}) => {
	const focusedObject = useFocusStore((state) => state.selectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const isVisible = !cameraIsMoving && (visibilityMode === "focus" ? focusedObject?.name === focusName : hoveredObject !== null && focusedObject === null);
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
		<Html transform sprite={visibilityMode === "hover"} position={position} rotation={rotation} scale={scale} distanceFactor={1} pointerEvents="auto">
			<button
				className={`interaction-label ${isLeaving ? "is-leaving" : ""} ${visibilityMode === "hover" ? "floating" : ""} ${staticCameraMovement ? "static" : ""}`}
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
