import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { FocusContextProvider } from "./Helper/Provider/FocusContextProvider";

import Portfolio from "./components/Portfolio";
import { HoverContextProvider } from "./Helper/Provider/HoverContextProvider";

const Experience = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const isDebugMode = urlParams.has("debug");
	return (
		<>
			<FocusContextProvider>
				<HoverContextProvider>
					<Leva hidden={!isDebugMode} />
					<Canvas frameloop="demand" performance={{ min: 0.35, max: 1, debounce: 300 }} gl={{ antialias: false }} shadows>
						<Portfolio isDebugMode={isDebugMode} />
					</Canvas>
				</HoverContextProvider>
			</FocusContextProvider>
		</>
	);
};

export default Experience;
