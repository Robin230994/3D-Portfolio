import { Material, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useEffect } from "react";

import MaterialCreator from "../../classes/MaterialCreator";
import OfficeChair from "../Targets/OfficeChair/OfficeChair";

const materialCreator = MaterialCreator.getInstance();
const iot1Material = materialCreator.createStandardMaterialFromTexture("iot1Material", {
	diffuseT: "/baked-textures/Objects/TI1/objects_ti1_color.jpg",
	roughnessT: "/baked-textures/Objects/TI1/objects_ti1_roughness.jpg",
});

const ImageObjectT1: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const IObjectT1: Mesh = nodes["image_object_t1"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={IObjectT1.geometry} position={IObjectT1.position} rotation={IObjectT1.rotation} material={iot1Material} scale={IObjectT1.scale} />
			<OfficeChair name="Office-Chair" nodes={nodes} materials={{ iot1Material }} />
		</group>
	);
};

export default ImageObjectT1;
