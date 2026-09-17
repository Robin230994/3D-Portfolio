import { Material, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const ObjectT7: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT8: Mesh = nodes["object_t8"] as Mesh;
	const Mouse: Mesh = nodes["Mouse"] as Mesh;
	const ot7Material = ObjectT8.material as Material;

	return (
		<group name={name}>
			<mesh geometry={ObjectT8.geometry} position={ObjectT8.position} rotation={ObjectT8.rotation} material={ot7Material} scale={ObjectT8.scale} />
			<mesh geometry={Mouse.geometry} position={Mouse.position} rotation={Mouse.rotation} material={ot7Material} scale={Mouse.scale} />
		</group>
	);
};

export default ObjectT7;
