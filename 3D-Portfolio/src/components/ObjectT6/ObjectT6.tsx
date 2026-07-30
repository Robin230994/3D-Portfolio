import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { Material } from "three";
import { useEffect } from "react";

import MaterialCreator from "../../classes/MaterialCreator";
import Clock from "../Targets/Clock/Clock";
import Logos from "../Targets/Logos/Logos";

const materialCreator = MaterialCreator.getInstance();

const ObjectT6: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT6: Mesh = nodes["object_t6"] as Mesh;

	const t6Material = ObjectT6.material as Material;

	useEffect(() => {
		materialCreator.addInstanciatedMaterial("t6Material", t6Material);
		t6Material.transparent = true;
	}, [t6Material]);

	return (
		<group name={name}>
			<mesh geometry={ObjectT6.geometry} position={ObjectT6.position} rotation={ObjectT6.rotation} material={t6Material} scale={ObjectT6.scale} />
			<Clock name="Clock" nodes={nodes} materials={{ t6Material }} />
			<Logos name="Logos" nodes={nodes} materials={{ t6Material }} />
		</group>
	);
};

export default ObjectT6;
