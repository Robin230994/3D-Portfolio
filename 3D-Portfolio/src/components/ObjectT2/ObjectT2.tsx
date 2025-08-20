import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const t2Material = materialCreator.createStandardMaterialFromTexture(
	"ObjectT2",
	{
		diffuseT: "/baked-textures/Objects/T2/objects_t2_color.png",
		roughnessT: "/baked-textures/Objects/T2/objects_t2_roughness.jpg",
	},
	true
);

const ObjectT2: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT2: Mesh = nodes["object_t2"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={ObjectT2.geometry} position={ObjectT2.position} rotation={ObjectT2.rotation} scale={ObjectT2.scale} material={t2Material} />
		</group>
	);
};

export default ObjectT2;
