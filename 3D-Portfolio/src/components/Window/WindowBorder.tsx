import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const WindowBorder: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry} position={object.position}>
			<meshStandardMaterial color={"#000000"} />
		</mesh>
	);
};

export default WindowBorder;
