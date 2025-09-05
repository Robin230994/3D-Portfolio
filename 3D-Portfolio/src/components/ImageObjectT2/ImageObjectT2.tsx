import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { iot2Material } from "../../Helper/GLMaterials";

import FCBox from "../Targets/FCBox/FCBox";
import Musterbox from "../Targets/Musterbox/Musterbox";

const ImageObjectT2: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const IObjectT2: Mesh = nodes["image_object_t2"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={IObjectT2.geometry} position={IObjectT2.position} rotation={IObjectT2.rotation} material={iot2Material} scale={IObjectT2.scale} />
			<FCBox name="FCBox" nodes={nodes} />
			{/* <Musterbox name="Musterbox" nodes={nodes} /> */}
		</group>
	);
};

export default ImageObjectT2;
