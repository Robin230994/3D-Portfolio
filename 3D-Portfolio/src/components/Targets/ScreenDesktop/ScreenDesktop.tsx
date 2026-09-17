import { Html } from "@react-three/drei";
import { useControls } from "leva";

const ScreenDesktop: React.FC = () => {
	const { screenPos } = useControls("ScreenUIDesktop", {
		screenPos: { value: { x: 0.06, y: 0.72, z: -1.08 } },
	});

	return (
		<Html transform position={[screenPos.x, screenPos.y, screenPos.z]} scale={1} distanceFactor={1} zIndexRange={[1, 1]} pointerEvents="auto">
			<div className="screen-desktop">
				<div className="mac-menu-bar">
					<span className="mac-apple">●</span>
					<strong>Finder</strong>
					<span>File</span>
					<span>Edit</span>
					<span>View</span>
					<span>Go</span>
				</div>
				<div className="mac-dock">
					<button className="mac-dock-finder">⌘</button>
					<span>▣</span>
					<span>◉</span>
					<span>◌</span>
				</div>
			</div>
		</Html>
	);
};

export default ScreenDesktop;
