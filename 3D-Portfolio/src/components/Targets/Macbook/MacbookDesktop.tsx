import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";

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
		activeProject: "About me" | "Websites" | "Apps";
		setActiveProject: React.Dispatch<React.SetStateAction<"About me" | "Websites" | "Apps">>;
	};
}

const MacbookDesktop: React.FC<IMacbookDesktopProps> = ({ props }) => {
	const { activeProject, setActiveProject } = props;
	const [finderVisible, setFinderVisible] = useState(true);
	const [finderClosing, setFinderClosing] = useState(false);

	useEffect(() => {
		if (!finderClosing) return;

		const hideFinder = window.setTimeout(() => {
			setFinderVisible(false);
			setFinderClosing(false);
		}, 220);

		return () => window.clearTimeout(hideFinder);
	}, [finderClosing]);

	return (
		<Html transform position={[-0.38, 0, -1.95]} rotation={[-Math.PI / 2, 0, 0]} scale={4} distanceFactor={1} pointerEvents="auto">
			<div className="mac-desktop" onPointerDown={(event) => event.stopPropagation()}>
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
							<strong>{activeProject}</strong>
						</div>
						<div className="finder-content">
							<aside>
								<span>Favorites</span>
								<strong>⌂ Desktop</strong>
								<strong className="finder-content-about" onClick={() => setActiveProject("About me")}>
									⌂ About me
								</strong>
								<strong>▣ My Projects</strong>
								<ul className="finder-content-projects">
									<li onClick={() => setActiveProject("Websites")}>
										<strong>▣ Websites</strong>
									</li>
									<li onClick={() => setActiveProject("Apps")}>
										<strong>▣ Apps</strong>
									</li>
								</ul>
							</aside>
							<div className="finder-content-project">
								{activeProject === "Websites" && (
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
