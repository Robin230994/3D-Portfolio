import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Portfolio from "./components/Portfolio";
import CameraEdgeLabel from "./components/CameraEdgeLabel/CameraEdgeLabel";
import MusicMenu from "./components/MusicMenu/MusicMenu";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

const Experience = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const isDebugMode = urlParams.has("debug");
	return (
		<>
			<Leva hidden={!isDebugMode} />
			<CameraEdgeLabel />
			<MusicMenu />
			<MusicPlayer />
			<Canvas dpr={[1, 1.5]} performance={{ min: 0.15, max: 1, debounce: 300 }} gl={{ antialias: false }} camera={{ near: 0.1, far: 30, fov: 60 }}>
				<Portfolio isDebugMode={isDebugMode} />
				{/* <Model /> */}
			</Canvas>
		</>
	);
};

export default Experience;
