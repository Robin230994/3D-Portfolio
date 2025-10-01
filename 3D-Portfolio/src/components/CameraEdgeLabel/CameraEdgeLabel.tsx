import { useEffect, useState } from "react";
import { useCameraStore } from "../../Stores/useCameraStore";

const HOLD_DURATION = 1.5; // seconds
const FADE_DURATION = 600; // ms

const CameraEdgeLabel: React.FC = () => {
	const { edgeSide, edgeProgress, edgeHoldTime, setEdgePulseComplete } = useCameraStore();
	const [animating, setAnimating] = useState(false);
	const [animProgress, setAnimProgress] = useState(0);

	// Trigger the grow+fade animation once after holding the edge
	useEffect(() => {
		const shouldTrigger = edgeProgress >= 1 && edgeHoldTime >= HOLD_DURATION && !animating;

		if (!shouldTrigger) return;

		setAnimating(true);
		setAnimProgress(0);
		const start = performance.now();

		const animate = (time: number) => {
			const t = Math.min((time - start) / FADE_DURATION, 1);
			setAnimProgress(t);

			if (t < 1) {
				requestAnimationFrame(animate);
			} else {
				// animation done
				setAnimating(false);
				setEdgePulseComplete(true);
			}
		};

		requestAnimationFrame(animate);
	}, [edgeProgress, edgeHoldTime, animating, setEdgePulseComplete]);

	// Nothing to show if no edge or no progress
	if (!edgeSide || edgeProgress <= 0) return null;

	const minSize = 30;
	const maxSize = 80;

	// normal grow with edge drag
	let size = minSize + (maxSize - minSize) * edgeProgress;
	let opacity = 0.8;

	// If the animation was triggered
	if (animating) {
		const extraGrowth = 0.5; // +50% size bonus
		size *= 1 + extraGrowth * animProgress; // grow once
		opacity = 0.8 * (1 - animProgress); // fade out
	}

	return (
		<div
			style={{
				position: "fixed",
				top: "50%",
				transform: "translateY(-50%)",
				[edgeSide]: "10px",
				width: `${size}px`,
				height: `${size}px`,
				borderRadius: "50%",
				background: `rgba(255,255,255,${opacity})`,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				pointerEvents: "none",
				fontSize: `${size / 3}px`,
				fontWeight: "bold",
				color: "#333",
				boxShadow: "0 0 10px rgba(0,0,0,0.3)",
				transition: "width 0.1s, height 0.1s, font-size 0.1s",
				zIndex: 1000,
			}}>
			⇄
		</div>
	);
};

export default CameraEdgeLabel;
