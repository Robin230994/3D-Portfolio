import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";

import Portfolio from "./components/Portfolio";

const Experience = () => {
	return (
		<>
			<Leva collapsed />
			<Canvas
				camera={{
					fov: 45,
					near: 0.1,
					far: 200,
					position: [2.5, 4, 6],
				}}>
				<Portfolio />
				<OrbitControls />
			</Canvas>
		</>
	);
};

export default Experience;
