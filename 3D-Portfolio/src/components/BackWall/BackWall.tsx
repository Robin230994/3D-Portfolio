import { MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const backWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("BackWall", {
	diffuseT: "/baked-textures/Walls/Back/back_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Back/back_wall_roughness.webp",
	normalT: "/baked-textures/Walls/Back/back_wall_normal.png",
});

const BackWall: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...backWallMaterial} />
		</mesh>
	);
};

export default BackWall;
