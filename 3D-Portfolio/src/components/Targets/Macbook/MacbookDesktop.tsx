import { Html } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useState } from "react";
import VirtualCursor from "../../VirtualCursor/VirtualCursor";
import { useVirtualCursorStore, VIRTUAL_DISPLAYS } from "../../../Stores/useVirtualCursorStore";

const websites = [
	{ label: "Alexander Dort GmbH", href: "https://www.alexanderdort.com" },
	{ label: "Pslzme", href: "https://www.pslzme.com" },
	{ label: "Printers Lounge", href: "https://www.printerslounge.com" },
	{ label: "Dorji", href: "https://www.dorji.de" },
	{ label: "Cyved", href: "https://www.cyved.com" },
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

	const virtualCursorX = useVirtualCursorStore((state) => state.x);
	const virtualCursorY = useVirtualCursorStore((state) => state.y);

	const macbookDisplay = VIRTUAL_DISPLAYS.macbook;

	const cursorInsideMacbook =
		virtualCursorX >= macbookDisplay.left &&
		virtualCursorX <= macbookDisplay.left + macbookDisplay.width &&
		virtualCursorY >= macbookDisplay.top &&
		virtualCursorY <= macbookDisplay.top + macbookDisplay.height;

	const macbookCursorX = virtualCursorX - macbookDisplay.left;
	const macbookCursorY = virtualCursorY - macbookDisplay.top;

	// console.log(macbookCursorX, macbookCursorY);

	useEffect(() => {
		if (!finderClosing) return;

		const hideFinder = window.setTimeout(() => {
			setFinderVisible(false);
			setFinderClosing(false);
		}, 220);

		return () => window.clearTimeout(hideFinder);
	}, [finderClosing]);

	const { uiPos, uiRot } = useControls("UIDesktop", {
		uiPos: { value: { x: -0.01, y: 0.26, z: -0.08 } },
		uiRot: { value: { x: -0.3, y: 0, z: 0 } },
	});

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
							<div className="finder-content-project">
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
											<a key={project.href} href={project.href} target="_blank" rel="noreferrer" className="finder-folder">
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
