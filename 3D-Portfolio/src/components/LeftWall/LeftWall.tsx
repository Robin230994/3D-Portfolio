import { MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const leftWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("LeftWall", {
	diffuseT: "/baked-textures/Walls/Left/left_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Left/left_wall_roughness.webp",
	normalT: "/baked-textures/Walls/Left/left_wall_normal.png",
});

const LeftWall: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...leftWallMaterial} />
		</mesh>
	);
};

export default LeftWall;
