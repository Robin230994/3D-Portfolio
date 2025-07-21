import { Html } from "@react-three/drei";
import { useControls } from "leva";

const HoverLabel = ({ visible, children }: { visible: boolean; children: React.ReactNode }) => {
	const { labelPosition } = useControls("HoverLabel", {
		labelPosition: { value: { x: 0, y: 0.2, z: -0.2 }, step: 0.001 },
	});

	return (
		<Html position={[labelPosition.x, labelPosition.y, labelPosition.z]} center>
			<div className={`hover-label ${visible ? "visible" : ""}`}>{children}</div>
		</Html>
	);
};

export default HoverLabel;
