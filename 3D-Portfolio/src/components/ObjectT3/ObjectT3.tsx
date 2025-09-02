import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { t3Material } from "../../Helper/GLMaterials";

import BambuLab from "../Targets/BambuLab/BambuLab";
import BillardTriangle from "../Targets/BillardTriangle/BillardTriangle";

const ObjectT3: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT3: Mesh = nodes["object_t3"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={ObjectT3.geometry} position={ObjectT3.position} rotation={ObjectT3.rotation} material={t3Material} scale={ObjectT3.scale} />
			<BambuLab name="BambuLab" nodes={nodes} />
			<BillardTriangle name="BillardTriangle" nodes={nodes} />
		</group>
	);
};

export default ObjectT3;
