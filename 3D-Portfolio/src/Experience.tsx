import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Portfolio from "./components/Portfolio";

const Experience = () => {
	return (
		<>
			<Leva collapsed />
			<Canvas frameloop="demand" performance={{ min: 0.4, max: 1, debounce: 100 }}>
				<Portfolio />
			</Canvas>
		</>
	);
};

export default Experience;
