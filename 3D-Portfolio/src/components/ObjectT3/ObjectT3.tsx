import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const t3Material = materialCreator.createStandardMaterialFromTexture("ObjectT3", {
	diffuseT: "/baked-textures/Objects/T3/objects_t3_color.png",
	roughnessT: "/baked-textures/Objects/T3/objects_t3_roughness.jpg",
	metallnessT: "/baked-textures/Objects/T3/objects_t3_metallic.jpg",
});

const ObjectT3: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT3: Mesh = nodes["object_t3"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={ObjectT3.geometry} position={ObjectT3.position} rotation={ObjectT3.rotation} material={t3Material} scale={ObjectT3.scale} />
		</group>
	);
};

export default ObjectT3;
