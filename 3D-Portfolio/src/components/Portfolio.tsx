import { useGLTF } from "@react-three/drei";

function Portfolio() {
	const office = useGLTF("./office-room.glb");
	console.log(office);
	return (
		<>
			<directionalLigh intensity={68300} color="#ffd395" position={[15.66, 5.009, 2.589]} rotation={[-0.793, 1.206, -2.776]} />
			<primitive object={office.scene} />
		</>
	);
}

export default Portfolio;
