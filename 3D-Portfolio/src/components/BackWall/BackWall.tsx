import { Mesh } from "three";
import { backWallMaterial } from "../../Helper/materials";

interface BackWallProps {
	name: string;
	object: Mesh;
}

const BackWall: React.FC<BackWallProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...backWallMaterial} />
		</mesh>
	);
};

export default BackWall;
