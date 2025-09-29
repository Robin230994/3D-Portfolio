import { useCameraStore } from "../../Stores/useCameraStore";

const CameraEdgeLabel: React.FC = () => {
	const { edgeSide, edgeProgress } = useCameraStore();

	if (!edgeSide || edgeProgress <= 0) return null;

	const minSize = 30;
	const maxSize = 80;
	const size = minSize + (maxSize - minSize) * edgeProgress;

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
				background: "rgba(255,255,255,0.8)",
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
