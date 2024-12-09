import { MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const roofMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("Roof", {
	diffuseT: "/baked-textures/Roof/roof_baked_color.jpg",
	roughnessT: "/baked-textures/Roof/roof_baked_roughness.jpg",
	normalT: "/baked-textures/Roof/roof_baked_normal.png",
});

const Roof: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...roofMaterial} />
		</mesh>
	);
};

export default Roof;
