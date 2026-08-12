import { Html } from "@react-three/drei";

const projects = [
	{ label: "cyved.com", href: "https://cyved.com" },
	{ label: "pslzme.com", href: "https://pslzme.com" },
];

const MacbookDesktop: React.FC = () => (
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
			<div className="finder-window">
				<div className="finder-titlebar">
					<div className="finder-controls">
						<i />
						<i />
						<i />
					</div>
					<strong>Projects</strong>
				</div>
				<div className="finder-content">
					<aside>
						<span>Favorites</span>
						<strong>⌂ Desktop</strong>
						<strong>▣ Projects</strong>
					</aside>
					<div className="finder-folders">
						{projects.map((project) => (
							<a key={project.href} href={project.href} target="_blank" rel="noreferrer" className="finder-folder">
								<span>📁</span>
								{project.label}
							</a>
						))}
					</div>
				</div>
			</div>
			<div className="mac-dock">
				<span>⌘</span>
				<span>▣</span>
				<span>◉</span>
				<span>◌</span>
			</div>
		</div>
	</Html>
);

export default MacbookDesktop;
