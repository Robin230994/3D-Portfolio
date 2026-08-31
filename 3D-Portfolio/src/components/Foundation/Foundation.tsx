import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { foundationMaterial } from "../../Helper/GLMaterials";

import PictureFrame from "../Targets/PictureFrame/PictureFrame";
import Window from "../Targets/Window/Window";

const Foundation: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Foundation = nodes["foundation_t1"] as Mesh;

	return (
		<group name={name}>
			{/** Foundation */}
			<mesh geometry={Foundation.geometry} position={Foundation.position} material={foundationMaterial} scale={Foundation.scale} />

			{/** Window */}
			<Window name="Window" nodes={nodes} />

			{/** Picture Frame */}
			<PictureFrame name="PictureFrame" nodes={nodes} />
		</group>
	);
};

export default Foundation;
