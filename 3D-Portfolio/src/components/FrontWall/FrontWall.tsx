import { frontWallMaterial } from "../../Helper/materials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const FrontWall: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...frontWallMaterial} />
		</mesh>
	);
};

export default FrontWall;
