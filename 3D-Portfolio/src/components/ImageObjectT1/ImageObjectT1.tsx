import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { iot1Material } from "../../Helper/GLMaterials";

import OfficeChair from "../Targets/OfficeChair/OfficeChair";

const ImageObjectT1: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const IObjectT1: Mesh = nodes["image_object_t1"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={IObjectT1.geometry} position={IObjectT1.position} rotation={IObjectT1.rotation} material={iot1Material} scale={IObjectT1.scale} />
			<OfficeChair name="Office-Chair" nodes={nodes} />
		</group>
	);
};

export default ImageObjectT1;
