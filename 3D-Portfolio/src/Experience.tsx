import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";

import Portfolio from "./components/Portfolio";

const Experience = () => {
	return (
		<>
			<Leva collapsed />
			<Canvas>
				<Portfolio />
				<OrbitControls />
			</Canvas>
		</>
	);
};

export default Experience;
