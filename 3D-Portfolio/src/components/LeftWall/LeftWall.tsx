import { leftWallMaterial } from "../../Helper/materials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const LeftWall: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...leftWallMaterial} />
		</mesh>
	);
};

export default LeftWall;
