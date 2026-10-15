import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { useEffect } from "react";
import { useProjectPanelStore } from "./Stores/useProjectPanelStore";

import Portfolio from "./components/Portfolio";
import MusicMenu from "./components/MusicMenu/MusicMenu";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import ProjectPanel from "./components/ProjectPanel/ProjectPanel";
import useProjectDescription from "./hooks/useProjectDescription";
import ColorPalette from "./components/Targets/PaintingBoard/ColorPalette";

const Experience = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const isDebugMode = urlParams.has("debug");
	const { project } = useProjectDescription();
	const setPanelClosed = useProjectPanelStore((state) => state.setPanelClosed);

	useEffect(() => {
		if (project) {
			setPanelClosed(false);
		}
	}, [project, setPanelClosed]);

	return (
		<>
			<Leva hidden={!isDebugMode} />
			<MusicMenu />
			<MusicPlayer />
			<ColorPalette />
			{project !== null && <ProjectPanel project={project} />}
			<Canvas shadows dpr={[1, 1.5]} performance={{ min: 0.15, max: 1, debounce: 300 }} gl={{ antialias: false }} camera={{ near: 0.1, far: 30, fov: 65 }}>
				<Portfolio isDebugMode={isDebugMode} />
			</Canvas>
		</>
	);
};

export default Experience;
