import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { folder, useControls } from "leva";
import { blackPlasticMaterial, metalMaterial } from "../../Helper/GLMaterials";

import InstantiatedMesh from "../InstanciatedMesh/InstantiatedMesh";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const chairBackrestMaterial = materialCreator.createStandardMaterialFromTexture("ChairBackrest", {
	diffuseT: "/baked-textures/Desk/Chair/desk_chair_baked_color.webp",
});
chairBackrestMaterial.roughness = 0.15;

const chairSitMaterial = materialCreator.createStandardMaterialFromTexture("ChairSit", {
	diffuseT: "/baked-textures/Desk/Chair/desk_chair_sit_color.webp",
});
chairSitMaterial.roughness = 0.31;

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Sit: Mesh = nodes["Sit"] as Mesh;
	const Backrest: Mesh = nodes["Backrest"] as Mesh;
	const BackrestController: Mesh = nodes["BackrestController"] as Mesh;
	const BackrestPillow: Mesh = nodes["BackrestPillow"] as Mesh;
	const ChairStand: Mesh = nodes["ChairStand"] as Mesh;
	const Roll: Mesh = nodes["Rolls"] as Mesh;

	const officeChairParams = useControls(
		"OfficeChair",
		{
			Rolls: folder({
				position: { value: { x: 5.24, y: 0.1, z: 0.03 }, step: 0.01 },
				rotation: { value: { x: 0, y: 0, z: 0 }, step: 1 },
			}),
			Sit: folder({
				sitRoughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
			}),
			Backrest: folder({
				backrestRoughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
			}),
		},
		{ collapsed: true }
	);

	/** Instantiate the position and the rotation of the five rolls for the chair */
	const chairRollInstances = [
		{
			position: [5.96, 0.1, -0.95] as [number, number, number],
			rotation: [0, 136, 0] as [number, number, number],
		},
		{
			position: [6.42, 0.1, -0.38] as [number, number, number],
			rotation: [0, 135, 0] as [number, number, number],
		},
		{
			position: [6.0, 0.1, 0.29] as [number, number, number],
			rotation: [0, 77, 0] as [number, number, number],
		},
		{
			position: [5.24, 0.1, 0.03] as [number, number, number],
			rotation: [0, 0, 0] as [number, number, number],
		},
		{
			position: [5.23, 0.1, -0.69] as [number, number, number],
			rotation: [0, 175, 0] as [number, number, number],
		},
	];

	return (
		<group name={name}>
			{/** Sit */}
			<mesh geometry={Sit.geometry} rotation={Sit.rotation} position={Sit.position} material={chairSitMaterial} />

			{/** Backrest */}
			<mesh geometry={Backrest.geometry} rotation={Backrest.rotation} position={Backrest.position} material={chairBackrestMaterial} />

			{/** BackrestController */}
			<mesh
				geometry={BackrestController.geometry}
				rotation={BackrestController.rotation}
				position={BackrestController.position}
				material={blackPlasticMaterial}
			/>

			{/** BackrestPillow */}
			<mesh geometry={BackrestPillow.geometry} rotation={BackrestPillow.rotation} position={BackrestPillow.position} material={blackPlasticMaterial} />

			{/** ChairStand */}
			<mesh geometry={ChairStand.geometry} rotation={ChairStand.rotation} position={ChairStand.position} material={metalMaterial} />

			{/** Rolls */}
			<InstantiatedMesh geometry={Roll.geometry} material={blackPlasticMaterial} instance={chairRollInstances} />
		</group>
	);
};

export default OfficeChair;
