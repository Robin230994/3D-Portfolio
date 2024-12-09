import { cupMaterial } from "../../Helper/materials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const CoffeeCup: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry} position={object.position} rotation={object.rotation}>
			<meshStandardMaterial {...cupMaterial} />
		</mesh>
	);
};

export default CoffeeCup;
