import { Html } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualCursorStore, VIRTUAL_DISPLAYS, VIRTUAL_POSITIONS } from "../../../Stores/useVirtualCursorStore";
import VirtualCursor from "../../VirtualCursor/VirtualCursor";

const websites = [
	{ label: "Alexander Dort GmbH", href: "https://www.alexanderdort.com" },
	{ label: "Pslzme", href: "https://www.pslzme.com" },
	{ label: "Printers Lounge", href: "https://www.printerslounge.com" },
	{ label: "Dorji Sushi To Go", href: "https://www.dorji.de" },
	{ label: "CYVED", href: "https://www.cyved.com" },
	{ label: "Matthias Holder", href: "https://www.matthiasholder.com" },
	{ label: "ALDUS Group", href: "https://aldusgroup.com" },
	{ label: "ALDUS Foils", href: "https://foils.aldusgroup.com" },
	{ label: "ALDUS Machines", href: "https://machines.aldusgroup.com" },
	{ label: "ALDUS Inks", href: "https://inks.aldusgroup.com" },
];

interface IMacbookDesktopProps {
	props: {
		activeTab: "About me" | "Projects" | "Websites" | "Apps";
		setActiveTab: React.Dispatch<React.SetStateAction<"About me" | "Projects" | "Websites" | "Apps">>;
		setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
	};
}

const MacbookDesktop: React.FC<IMacbookDesktopProps> = ({ props }) => {
	const { activeTab, setActiveTab, setIsHovered } = props;
	const [finderVisible, setFinderVisible] = useState(true);
	const [finderClosing, setFinderClosing] = useState(false);
	const [websiteFoldersScrollTop, setWebsiteFoldersScrollTop] = useState(0);

	const virtualCursorX = useVirtualCursorStore((state) => state.x);
	const virtualCursorY = useVirtualCursorStore((state) => state.y);
	const virtualWheel = useVirtualCursorStore((state) => state.virtualWheel);

	const websiteFoldersRef = useRef<HTMLDivElement>(null);

	const macbookDisplay = VIRTUAL_DISPLAYS.macbook;
	const macbookDisplayLeft = useMemo(() => VIRTUAL_DISPLAYS.macbook.left, []);
	const macbookDisplayTop = useMemo(() => VIRTUAL_DISPLAYS.macbook.top, []);

	const cursorInsideMacbook =
		virtualCursorX >= macbookDisplay.left &&
		virtualCursorX <= macbookDisplay.left + macbookDisplay.width &&
		virtualCursorY >= macbookDisplay.top &&
		virtualCursorY <= macbookDisplay.top + macbookDisplay.height;

	const macbookCursorX = virtualCursorX - macbookDisplay.left;
	const macbookCursorY = virtualCursorY - macbookDisplay.top;

	const { uiPos, uiRot } = useControls("UIDesktop", {
		uiPos: { value: { x: -0.01, y: 0.26, z: -0.08 } },
		uiRot: { value: { x: -0.3, y: 0, z: 0 } },
	});

	useEffect(() => {
		if (!finderClosing) return;

		const hideFinder = window.setTimeout(() => {
			setFinderVisible(false);
			setFinderClosing(false);
		}, 220);

		return () => window.clearTimeout(hideFinder);
	}, [finderClosing]);

	useEffect(() => {
		if (!websiteFoldersRef.current) return;
		const { x, y, deltaY } = virtualWheel;
		const macbookCursorX = x - macbookDisplayLeft;
		const macbookCursorY = y - macbookDisplayTop;

		const virtualCursorInsideFinderFolder = () => {
			return (
				macbookCursorX >= VIRTUAL_POSITIONS.FinderFolder.x[0] &&
				macbookCursorX <= VIRTUAL_POSITIONS.FinderFolder.x[1] &&
				macbookCursorY >= VIRTUAL_POSITIONS.FinderFolder.y[0] &&
				macbookCursorY <= VIRTUAL_POSITIONS.FinderFolder.y[1]
			);
		};

		if (virtualCursorInsideFinderFolder() && deltaY !== 0) {
			websiteFoldersRef.current.scrollBy({ top: deltaY, behavior: "auto" });
		}
	}, [macbookDisplayLeft, macbookDisplayTop, virtualWheel]);

	const virtualCursorOverFolder = (): string | null => {
		let locatedFolder: string | null = null;

		Object.entries(VIRTUAL_POSITIONS.ProjectFolders).forEach((position) => {
			const folderXPosition = position[1].x;
			const folderYPosition = position[1].y;
			const scrollAdjustedCursorY = macbookCursorY + websiteFoldersScrollTop;

			if (
				macbookCursorX >= folderXPosition[0] &&
				macbookCursorX <= folderXPosition[1] &&
				scrollAdjustedCursorY >= folderYPosition[0] &&
				scrollAdjustedCursorY <= folderYPosition[1]
			) {
				locatedFolder = position[0];
			}
		});

		return locatedFolder;
	};

	const hoveredFolder = virtualCursorOverFolder();

	return (
		<Html
			transform
			position={[uiPos.x, uiPos.y, uiPos.z]}
			rotation={[uiRot.x, uiRot.y, uiRot.z]}
			scale={0.58}
			distanceFactor={1}
			zIndexRange={[1, 1]}
			pointerEvents="auto">
			<div
				className="mac-desktop"
				onPointerDown={(event) => event.stopPropagation()}
				onPointerEnter={() => setIsHovered(true)}
				onPointerLeave={() => setIsHovered(false)}>
				{cursorInsideMacbook && <VirtualCursor x={macbookCursorX} y={macbookCursorY} width={macbookDisplay.width} height={macbookDisplay.height} />}

				<div className="mac-menu-bar">
					<span className="mac-apple">●</span>
					<strong>Finder</strong>
					<span>File</span>
					<span>Edit</span>
					<span>View</span>
					<span>Go</span>
				</div>
				{finderVisible && (
					<div className={`finder-window ${finderClosing ? "finder-window-closing" : ""}`}>
						<div className="finder-titlebar">
							<div className="finder-controls">
								<button className="finder-close-button" onClick={() => setFinderClosing(true)} />
								<i />
								<i />
							</div>
							<strong>{activeTab}</strong>
						</div>
						<div className="finder-content">
							<aside>
								<span>Favorites</span>
								<strong>⌂ Desktop</strong>
								<strong className="finder-content-about" onClick={() => setActiveTab("About me")}>
									⌂ About me
								</strong>
								<strong className="finder-content-projects" onClick={() => setActiveTab("Projects")}>
									▣ My Projects
								</strong>
								<ul className="finder-content-projects">
									<li onClick={() => setActiveTab("Websites")}>
										<strong>▣ Websites</strong>
									</li>
									<li onClick={() => setActiveTab("Apps")}>
										<strong>▣ Apps</strong>
									</li>
								</ul>
							</aside>
							<div
								className="finder-content-project"
								ref={websiteFoldersRef}
								onScroll={(element) => setWebsiteFoldersScrollTop(element.currentTarget.scrollTop)}>
								{activeTab === "Projects" && (
									<div className="finder-folders">
										<div className="finder-folder" onClick={() => setActiveTab("Websites")}>
											<span>📁</span>
											<p className="folder-name">Websites</p>
										</div>

										<div className="finder-folder" onClick={() => setActiveTab("Apps")}>
											<span>📁</span>
											<p className="folder-name">Apps</p>
										</div>
									</div>
								)}

								{activeTab === "Websites" && (
									<div className="finder-folders">
										{websites.map((project) => (
											<a
												data-virtual-clickable
												key={project.href}
												href={project.href}
												target="_blank"
												rel="noreferrer"
												className={`finder-folder ${hoveredFolder === project.label && "virtual-hover"}`}>
												<span>📁</span>
												<p className="folder-name">{project.label}</p>
											</a>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				<div className="mac-dock">
					<button className="mac-dock-finder" onClick={() => setFinderVisible(true)} aria-label="Open Finder">
						⌘
					</button>
					<span>▣</span>
					<span>◉</span>
					<span>◌</span>
				</div>
			</div>
		</Html>
	);
};

export default MacbookDesktop;
