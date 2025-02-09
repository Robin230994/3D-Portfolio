import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Portfolio from "./components/Portfolio";

const Experience = () => {
	return (
		<>
			<Leva collapsed />
			<Canvas performance={{ min: 0.3, max: 1, debounce: 200 }} shadows>
				<Portfolio />
			</Canvas>
		</>
	);
};

export default Experience;
