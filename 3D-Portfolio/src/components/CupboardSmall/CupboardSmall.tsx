import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { blackPlasticMaterial, cupboardDoorMaterial, deskMaterial } from "../../Helper/GLMaterials";
import InstantiatedMesh from "../InstanciatedMesh/InstantiatedMesh";

const CupboardSmall: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const SmallCupboard: Mesh = nodes["CupboardStand"] as Mesh;
	const SmallCupboardDrawerBottom: Mesh = nodes["Cube087"] as Mesh;
	const SmallCupboardDrawerFront: Mesh = nodes["Cube087_1"] as Mesh;
	const Roll: Mesh = nodes["Rolls"] as Mesh;

	const rollInstances = [
		{ position: [2.35, 0.1, 2.0] as [number, number, number], rotation: [0, -2.6, 0] as [number, number, number] },
		{ position: [1.53, 0.1, 1.95] as [number, number, number], rotation: [0, -1.5, 0] as [number, number, number] },
		{ position: [1.53, 0.1, 2.6] as [number, number, number], rotation: [0, -1.5, 0] as [number, number, number] },
		{ position: [2.35, 0.1, 2.7] as [number, number, number], rotation: [0, -2.6, 0] as [number, number, number] },
	];

	return (
		<group name={name}>
			<mesh geometry={SmallCupboard.geometry} position={SmallCupboard.position} rotation={SmallCupboard.rotation} material={deskMaterial} />
			<mesh
				geometry={SmallCupboardDrawerBottom.geometry}
				position={[1.954, 0.474, 2.239]}
				rotation={SmallCupboardDrawerBottom.rotation}
				material={deskMaterial}
			/>
			<mesh
				geometry={SmallCupboardDrawerFront.geometry}
				position={[1.954, 0.474, 2.239]}
				rotation={SmallCupboardDrawerFront.rotation}
				material={cupboardDoorMaterial}
			/>

			<InstantiatedMesh geometry={Roll.geometry} material={blackPlasticMaterial} instance={rollInstances} />
		</group>
	);
};

export default CupboardSmall;
