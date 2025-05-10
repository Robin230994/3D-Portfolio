import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Portfolio from "./components/Portfolio";
import { SelectObjectProvider } from "./Helper/Context/SelectHoverObjectContext";

const Experience = () => {
	return (
		<>
			<SelectObjectProvider>
				<Leva collapsed />
				<Canvas frameloop="demand" performance={{ min: 0.35, max: 1, debounce: 200 }} shadows>
					<Portfolio />
				</Canvas>
			</SelectObjectProvider>
		</>
	);
};

export default Experience;
