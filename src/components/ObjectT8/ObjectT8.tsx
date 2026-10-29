import { FC } from "react";
import { CustomMeshProps } from "../../utils/Interfaces";
import { Mesh } from "three";

const ObjectT8: FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT8 = nodes["object_t7"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={ObjectT8.geometry} position={ObjectT8.position} rotation={ObjectT8.rotation} scale={ObjectT8.scale} material={ObjectT8.material} />
		</group>
	);
};

export default ObjectT8;
