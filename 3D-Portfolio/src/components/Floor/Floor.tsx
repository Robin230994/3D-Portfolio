import { MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Floor", {
	diffuseT: "/baked-textures/Floor/floor_baked_color.jpg",
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
