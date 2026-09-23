import { useVirtualCursorStore, VIRTUAL_DISPLAYS } from "../../../Stores/useVirtualCursorStore";
import VirtualCursor from "../../VirtualCursor/VirtualCursor";

const ScreenCursor: React.FC = () => {
	const x = useVirtualCursorStore((state) => state.x);
	const y = useVirtualCursorStore((state) => state.y);

	const localX = x - VIRTUAL_DISPLAYS.screen.left;
	const localY = y - VIRTUAL_DISPLAYS.screen.top;

	const cursorInsideScreen =
		localX >= VIRTUAL_DISPLAYS.screen.left &&
		localX <= VIRTUAL_DISPLAYS.screen.left + VIRTUAL_DISPLAYS.screen.width &&
		localY >= VIRTUAL_DISPLAYS.screen.top &&
		localY <= VIRTUAL_DISPLAYS.screen.top + VIRTUAL_DISPLAYS.screen.height;

	if (!cursorInsideScreen) return null;

	return <VirtualCursor x={localX} y={localY} width={VIRTUAL_DISPLAYS.screen.width} height={VIRTUAL_DISPLAYS.screen.height} />;
};

export default ScreenCursor;
