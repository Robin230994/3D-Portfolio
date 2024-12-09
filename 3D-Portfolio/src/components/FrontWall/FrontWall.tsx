import { MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const frontWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("FrontWall", {
	diffuseT: "/baked-textures/Walls/Front/walls_color.webp",
	roughnessT: "/baked-textures/Walls/Front/walls_roughness.webp",
	normalT: "/baked-textures/Walls/Front/walls_normal.jpg",
});

const FrontWall: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...frontWallMaterial} />
		</mesh>
	);
};

export default FrontWall;
