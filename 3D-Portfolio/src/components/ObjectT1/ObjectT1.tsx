import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { Material } from "three";

const ObjectT1: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT1: Mesh = nodes["object_t1"] as Mesh;
	const t1Material = ObjectT1.material as Material;

	return (
		<group name={name}>
			<mesh geometry={ObjectT1.geometry} position={ObjectT1.position} rotation={ObjectT1.rotation} scale={ObjectT1.scale} material={t1Material} />
		</group>
	);
};

export default ObjectT1;
