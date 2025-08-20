import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const IOT2Material = materialCreator.createStandardMaterialFromTexture(
	"ImageObjectT2",
	{
		diffuseT: "/baked-textures/Objects/TI2/objects_ti2_color.png",
	},
	true
);

const ImageObjectT2: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const IObjectT2: Mesh = nodes["image_object_t2"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={IObjectT2.geometry} position={IObjectT2.position} rotation={IObjectT2.rotation} material={IOT2Material} scale={IObjectT2.scale} />
		</group>
	);
};

export default ImageObjectT2;
