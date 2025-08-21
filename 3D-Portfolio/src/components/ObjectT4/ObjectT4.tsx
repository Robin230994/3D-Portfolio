import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { Material } from "three";
import { useEffect } from "react";

import MaterialCreator from "../../classes/MaterialCreator";
import Macbook from "../Targets/Macbook/Macbook";

const materialCreator = MaterialCreator.getInstance();

const ObjectT4: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT4: Mesh = nodes["object_t4"] as Mesh;
	const t4Material = ObjectT4.material as Material;

	useEffect(() => {
		materialCreator.addInstanciatedMaterial("t4Material", t4Material);
		t4Material.transparent = true;
	}, [t4Material]);

	return (
		<group name={name}>
			<mesh geometry={ObjectT4.geometry} position={ObjectT4.position} rotation={ObjectT4.rotation} material={t4Material} scale={ObjectT4.scale} />
			<Macbook name="Macbook" nodes={nodes} />
		</group>
	);
};

export default ObjectT4;
