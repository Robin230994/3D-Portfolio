import { useEffect, useState } from "react";
import { useCameraStore } from "../../Stores/useCameraStore";

const HOLD_DURATION = 2;

const CameraEdgeLabel: React.FC = () => {
	const { edgeSide, edgeProgress, edgeHoldTime } = useCameraStore();
	const [pulse, setPulse] = useState(false);
	const [pulseProgress, setPulseProgress] = useState(0);

	// Trigger pulse when holding at the edge long enough
	useEffect(() => {
		if (edgeProgress >= 1 && edgeHoldTime >= HOLD_DURATION && !pulse) {
			setPulse(true);
			setPulseProgress(0);
			const start = performance.now();
			const duration = 600; // pulse duration in ms

			const animate = (time: number) => {
				const t = Math.min((time - start) / duration, 1);
				setPulseProgress(t);
				if (t < 1) requestAnimationFrame(animate);
				else setPulse(false);
			};

			requestAnimationFrame(animate);
		}
	}, [edgeProgress, edgeHoldTime, pulse]);

	if (!edgeSide || edgeProgress <= 0) return null;

	const minSize = 30;
	const maxSize = 80;

	let size = minSize + (maxSize - minSize) * edgeProgress;
	let opacity = 0.8;

	if (pulse) {
		const extraGrowth = 0.5; // 50% bigger
		size *= 1 + extraGrowth * pulseProgress;
		opacity = 0.8 * (1 - pulseProgress); // fade out
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
