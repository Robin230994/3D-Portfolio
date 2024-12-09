import { roofMaterial } from "../../Helper/materials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const Roof: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...roofMaterial} />
		</mesh>
	);
};

export default Roof;
