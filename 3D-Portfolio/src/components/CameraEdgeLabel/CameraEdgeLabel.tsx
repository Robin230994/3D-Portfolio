import { useEffect, useState } from "react";
import { useCameraStore } from "../../Stores/useCameraStore";
import { useFocusStore } from "../../Stores/useFocusStore";

const CameraEdgeLabel: React.FC = () => {
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setNextRoom = useCameraStore((state) => state.setNextRoom);
	const [edgeSide, setEdgeSide] = useState<"left" | "right" | null>(null);

	const getStyle = (side: "left" | "right") => ({
		position: "fixed" as const,
		top: "50%",
		[side]: "20px",
		transform: `translateY(-50%) scale(${edgeSide === side ? 1 : 0.3})`,
		width: "60px",
		height: "60px",
		borderRadius: "50%",
		background: "rgba(255,255,255,0.85)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "30px",
		fontWeight: "bold",
		color: "#333",
		boxShadow: "0 0 10px rgba(0,0,0,0.3)",
		pointerEvents: "auto" as const,
		cursor: "pointer",
		userSelect: "none" as const,
		zIndex: 1000,
		opacity: edgeSide === side ? 1 : 0.5,
		transition: "transform 0.2s ease, opacity 0.2s ease",
	});

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (e.clientX < 80) {
				setEdgeSide("left");
			} else if (e.clientX > window.innerWidth - 80) {
				setEdgeSide("right");
			} else {
				setEdgeSide(null);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<>
			{selectObjectFocus === null && (
				<>
					<div style={getStyle("left")} onClick={() => setNextRoom("left")}>
						←
					</div>

					<div style={getStyle("right")} onClick={() => setNextRoom("right")}>
						→
					</div>
				</>
			)}
		</>
	);
};

export default CameraEdgeLabel;
