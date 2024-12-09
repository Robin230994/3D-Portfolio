import { floorMaterial } from "../../Helper/materials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const Floor: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...floorMaterial} />
		</mesh>
	);
};

export default Floor;
