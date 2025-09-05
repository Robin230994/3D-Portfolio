import { Html } from "@react-three/drei";
import { useControls } from "leva";

const InteractionLabel = ({
	visible,
	children,
	labelPos,
	dispatch,
}: {
	visible: boolean;
	children: React.ReactNode;
	labelPos: [number, number, number];
	dispatch?: () => void;
}) => {
	const { labelPosition } = useControls("HoverLabel", {
		labelPosition: { value: { x: labelPos[0], y: labelPos[1], z: labelPos[2] }, step: 0.001 },
	});

	if (!visible) return null;

	return (
		<Html position={[labelPosition.x, labelPosition.y, labelPosition.z]} wrapperClass={"hover-label"} center occlude={false} style={{ pointerEvents: "auto" }}>
			{dispatch && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						dispatch?.();
					}}>
					{children}
				</button>
			)}
		</Html>
	);
};

export default InteractionLabel;
