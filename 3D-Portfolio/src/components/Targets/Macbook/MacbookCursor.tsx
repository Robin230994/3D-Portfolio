import { useEffect } from "react";
import { useVirtualCursorStore, VIRTUAL_DISPLAYS, VIRTUAL_POSITIONS } from "../../../Stores/useVirtualCursorStore";
import VirtualCursor from "../../VirtualCursor/VirtualCursor";

interface IMacbookCursor {
	scrollTop: number;
	setHoveredFolder: React.Dispatch<React.SetStateAction<string | null>>;
	scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const MacbookCursor: React.FC<IMacbookCursor> = ({ scrollTop, scrollContainerRef, setHoveredFolder }) => {
	const x = useVirtualCursorStore((state) => state.x);
	const y = useVirtualCursorStore((state) => state.y);
	const virtualWheel = useVirtualCursorStore((state) => state.virtualWheel);

	const localX = x - VIRTUAL_DISPLAYS.macbook.left;
	const localY = y - VIRTUAL_DISPLAYS.macbook.top;

	const cursorInsideMacbook =
		localX >= VIRTUAL_DISPLAYS.macbook.left &&
		localX <= VIRTUAL_DISPLAYS.macbook.left + VIRTUAL_DISPLAYS.macbook.width &&
		localY >= VIRTUAL_DISPLAYS.macbook.top &&
		localY <= VIRTUAL_DISPLAYS.macbook.top + VIRTUAL_DISPLAYS.macbook.height;

	const virtualCursorOverFolder = (): string | null => {
		let locatedFolder: string | null = null;

		Object.entries(VIRTUAL_POSITIONS.ProjectFolders).forEach((position) => {
			const folderXPosition = position[1].x;
			const folderYPosition = position[1].y;
			const scrollAdjustedCursorY = localY + scrollTop;

			if (
				localX >= folderXPosition[0] &&
				localX <= folderXPosition[1] &&
				scrollAdjustedCursorY >= folderYPosition[0] &&
				scrollAdjustedCursorY <= folderYPosition[1]
			) {
				locatedFolder = position[0];
			}
		});

		return locatedFolder;
	};

	const hoveredFolder: string | null = virtualCursorOverFolder();

	useEffect(() => {
		setHoveredFolder(hoveredFolder);
	}, [hoveredFolder, setHoveredFolder]);

	useEffect(() => {
		if (!scrollContainerRef.current) return;
		const { x, y, deltaY } = virtualWheel;
		const macbookCursorX = x - VIRTUAL_DISPLAYS.macbook.left;
		const macbookCursorY = y - VIRTUAL_DISPLAYS.macbook.top;

		const virtualCursorInsideFinderFolder = () => {
			return (
				macbookCursorX >= VIRTUAL_POSITIONS.FinderFolder.x[0] &&
				macbookCursorX <= VIRTUAL_POSITIONS.FinderFolder.x[1] &&
				macbookCursorY >= VIRTUAL_POSITIONS.FinderFolder.y[0] &&
				macbookCursorY <= VIRTUAL_POSITIONS.FinderFolder.y[1]
			);
		};

		if (virtualCursorInsideFinderFolder() && deltaY !== 0) {
			scrollContainerRef.current.scrollBy({ top: deltaY, behavior: "auto" });
		}
	}, [localX, localY, scrollContainerRef, virtualWheel]);

	if (!cursorInsideMacbook) return null;

	return <VirtualCursor x={localX} y={localY} width={VIRTUAL_DISPLAYS.macbook.width} height={VIRTUAL_DISPLAYS.macbook.height} />;
};

export default MacbookCursor;
