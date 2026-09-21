import { Html } from "@react-three/drei";
import { useControls } from "leva";
import { useVirtualCursorStore, VIRTUAL_DISPLAYS } from "../../../Stores/useVirtualCursorStore";
import VirtualCursor from "../../VirtualCursor/VirtualCursor";

const ScreenDesktop: React.FC = () => {
	const virtualCursorX = useVirtualCursorStore((state) => state.x);
	const virtualCursorY = useVirtualCursorStore((state) => state.y);

	const screenDisplay = VIRTUAL_DISPLAYS.screen;

	const cursorInsideScreen =
		virtualCursorX >= screenDisplay.left &&
		virtualCursorX <= screenDisplay.left + screenDisplay.width &&
		virtualCursorY >= screenDisplay.top &&
		virtualCursorY <= screenDisplay.top + screenDisplay.height;

	const screenCursorX = virtualCursorX - screenDisplay.left;
	const screenCursorY = virtualCursorY - screenDisplay.top;

	const { screenPos } = useControls("ScreenUIDesktop", {
		screenPos: { value: { x: 0.06, y: 0.72, z: -1.08 } },
	});

	return (
		<Html transform position={[screenPos.x, screenPos.y, screenPos.z]} scale={1} distanceFactor={1} zIndexRange={[1, 1]} pointerEvents="auto">
			<div className="screen-desktop">
				{cursorInsideScreen && <VirtualCursor x={screenCursorX} y={screenCursorY} width={screenDisplay.width} height={screenDisplay.height} />}
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
