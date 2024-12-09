import { windowWallMaterial } from "../../Helper/materials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const WindowWall: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...windowWallMaterial} />
		</mesh>
	);
};

export default WindowWall;
