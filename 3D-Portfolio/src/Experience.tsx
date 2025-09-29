import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Model } from "../public/Office-room";

import Portfolio from "./components/Portfolio";
import CameraEdgeLabel from "./components/CameraEdgeLabel/CameraEdgeLabel";

const Experience = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const isDebugMode = urlParams.has("debug");
	return (
		<>
			<CameraEdgeLabel />
			<Leva hidden={!isDebugMode} />
			<Canvas frameloop="demand" performance={{ min: 0.35, max: 1, debounce: 300 }} gl={{ antialias: false }} shadows>
				<Portfolio isDebugMode={isDebugMode} />
				{/* <Model /> */}
			</Canvas>
		</>
	);
};

export default Experience;
