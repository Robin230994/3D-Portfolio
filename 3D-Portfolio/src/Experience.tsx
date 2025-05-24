import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { SelectObjectProvider } from "./Helper/Provider/SelectObjectProvider";

import Portfolio from "./components/Portfolio";

const Experience = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const isDebugMode = urlParams.has("debug");
	return (
		<>
			<SelectObjectProvider>
				<Leva hidden={!isDebugMode} />
				<Canvas frameloop="demand" performance={{ min: 0.35, max: 1, debounce: 200 }} shadows>
					<Portfolio isDebugMode={isDebugMode} />
				</Canvas>
			</SelectObjectProvider>
		</>
	);
};

export default Experience;
