import { filingMaterial } from "../../Helper/materials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const Filling: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry} position={object.position}>
			<meshStandardMaterial {...filingMaterial} />
		</mesh>
	);
};

export default Filling;
