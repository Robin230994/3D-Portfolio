import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Portfolio from "./components/Portfolio";
import MusicMenu from "./components/MusicMenu/MusicMenu";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import ProjectPanel from "./components/ProjectPanel/ProjectPanel";
import useProjectDescription from "./hooks/useProjectDescription";

const Experience = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const isDebugMode = urlParams.has("debug");
	const { project } = useProjectDescription();

	return (
		<>
			<Leva hidden={!isDebugMode} />
			{/* <CameraEdgeLabel /> */}
			<MusicMenu />
			{project !== null && <ProjectPanel project={project} />}
			<MusicPlayer />
			<Canvas dpr={[1, 1.5]} performance={{ min: 0.15, max: 1, debounce: 300 }} gl={{ antialias: false }} camera={{ near: 0.1, far: 30, fov: 75 }}>
				<Portfolio isDebugMode={isDebugMode} />
				{/* <Model /> */}
			</Canvas>
		</>
	);
};

export default Experience;
