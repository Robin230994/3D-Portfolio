import { MeshStandardMaterial, Texture } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const diffuseFloorTexture = materialCreator.loadTexture("/baked-textures/Floor/floor_baked_color.jpg") as Texture;
diffuseFloorTexture.flipY = false;

const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("Floor", {
	diffuseT: diffuseFloorTexture,
	roughnessT: "/baked-textures/Floor/floor_baked_roughness.jpg",
	normalT: "/baked-textures/Floor/floor_baked_normal.png",
});

const Floor: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...floorMaterial} />
		</mesh>
	);
};

export default Floor;
