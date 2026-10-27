import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import { useProjectPanelStore } from "./Stores/useProjectPanelStore";

import Portfolio from "./components/Portfolio";
import MusicMenu from "./components/MusicMenu/MusicMenu";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import ProjectPanel from "./components/ProjectPanel/ProjectPanel";
import useProjectDescription from "./hooks/useProjectDescription";
import ColorPalette from "./components/Targets/PaintingBoard/ColorPalette";
import VRVideo from "./components/VRVideo/VRVideo";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { Preload } from "@react-three/drei";

const Experience = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const isDebugMode = urlParams.has("debug");
	const { project } = useProjectDescription();
	const setPanelClosed = useProjectPanelStore((state) => state.setPanelClosed);

	const [sceneLoaded, setSceneLoaded] = useState<boolean>(false);

	useEffect(() => {
		if (project) {
			setPanelClosed(false);
		}
	}, [project, setPanelClosed]);

	return (
		<>
			<Leva hidden={!isDebugMode} />
			{project !== null && <ProjectPanel project={project} />}

			{!sceneLoaded ? (
				<LoadingScreen onLoaded={() => setSceneLoaded(true)} />
			) : (
				<>
					<MusicMenu />
					<MusicPlayer />
					<ColorPalette />
					<VRVideo />
				</>
			)}

			<Canvas shadows dpr={[0.75, 1.5]} performance={{ min: 0.65, max: 1, debounce: 1000 }} gl={{ antialias: false }} camera={{ near: 0.1, far: 30, fov: 65 }}>
				<Suspense fallback={null}>
					<Portfolio isDebugMode={isDebugMode} />
					<Preload all />
				</Suspense>
			</Canvas>
		</>
	);
};

export default Experience;
