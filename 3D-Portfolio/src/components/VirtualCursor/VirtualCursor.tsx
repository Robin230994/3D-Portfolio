interface IVirtualCursor {
	x: number;
	y: number;
	width: number;
	height: number;
}

const CURSOR_RIGHT_SAFETY = 15;
const CURSOR_BOTTOM_SAFETY = 20;

const VirtualCursor: React.FC<IVirtualCursor> = ({ x, y, width, height }) => {
	const cursorX = Math.max(0, Math.min(x, width - 10 - CURSOR_RIGHT_SAFETY));
	const cursorY = Math.max(0, Math.min(y, height - 10 - CURSOR_BOTTOM_SAFETY));
	console.log("x:", x, "y:", y);
	return <div className="virtual-cursor" style={{ left: `${cursorX}px`, top: `${cursorY}px` }} />;
};

export default VirtualCursor;
