import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { Material } from "three";
import { useEffect } from "react";

import MaterialCreator from "../../classes/MaterialCreator";
import Macbook from "../Targets/Macbook/Macbook";

const materialCreator = MaterialCreator.getInstance();

const ObjectT5: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const ObjectT5: Mesh = nodes["object_t5"] as Mesh;
	const t5Material = ObjectT5.material as Material;

	useEffect(() => {
		materialCreator.addInstanciatedMaterial("t5Material", t5Material);
		t5Material.transparent = true;
	}, [t5Material]);

	return (
		<group name={name}>
			<mesh geometry={ObjectT5.geometry} position={ObjectT5.position} rotation={ObjectT5.rotation} material={t5Material} scale={ObjectT5.scale} />
			<Macbook name="MacbookTopSide" nodes={nodes} animations={animations} />
		</group>
	);
};

export default ObjectT5;
