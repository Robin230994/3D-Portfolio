import { Material, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useEffect } from "react";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const ObjectT2: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT2: Mesh = nodes["object_t2"] as Mesh;
	const t2Material = ObjectT2.material as Material;

	useEffect(() => {
		t2Material.alphaTest = 0.5;
		materialCreator.addInstanciatedMaterial("T2Material", t2Material);
	}, [t2Material]);

	return (
		<group name={name}>
			<mesh geometry={ObjectT2.geometry} position={ObjectT2.position} rotation={ObjectT2.rotation} scale={ObjectT2.scale} material={t2Material} />
		</group>
	);
};

export default ObjectT2;
