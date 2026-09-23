import { Material, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useEffect } from "react";

import FloorLamp from "../Targets/FloorLamp/FloorLamp";

const ObjectT2: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT2: Mesh = nodes["object_t2"] as Mesh;
	const t2Material = ObjectT2.material as Material;

	useEffect(() => {
		t2Material.alphaTest = 0.5;
	}, [t2Material]);

	return (
		<group name={name}>
			<mesh geometry={ObjectT2.geometry} position={ObjectT2.position} rotation={ObjectT2.rotation} scale={ObjectT2.scale} material={t2Material} />
			<FloorLamp name="FloorLamp" nodes={nodes} materials={{ t2Material }}></FloorLamp>
		</group>
	);
};

export default ObjectT2;
