import { Material, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const t7Material = materialCreator.createStandardMaterialFromTexture("t7Material", {
	diffuseT: "/baked-textures/Objects/objects_t8_color.jpg",
	roughnessT: "/baked-textures/Objects/objects_t6_roughness.jpg",
	metallnessT: "/baked-textures/Objects/objects_t6_metallness.jpg",
});

const ObjectT7: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT8: Mesh = nodes["object_t8"] as Mesh;
	const ot7Material = ObjectT8.material as Material;

	return (
		<group name={name}>
			<mesh geometry={ObjectT8.geometry} position={ObjectT8.position} rotation={ObjectT8.rotation} material={ot7Material} scale={ObjectT8.scale} />
		</group>
	);
};

export default ObjectT7;
