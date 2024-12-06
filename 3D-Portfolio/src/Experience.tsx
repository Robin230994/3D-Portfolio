import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Portfolio from "./components/Portfolio";
import { Perf } from "r3f-perf";

const Experience = () => {
	return (
		<Canvas
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [2.5, 4, 6],
			}}>
			<Perf position="top-left" />
			<Portfolio />
			<OrbitControls />
		</Canvas>
	);
};

export default Experience;
