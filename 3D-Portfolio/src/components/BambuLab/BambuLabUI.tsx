import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { Color, Mesh, MeshPhongMaterial } from "three";
import { DirectionalLight } from "three";
import { blackPlasticMaterial, deskMaterial, glassMaterial, goldMetalMaterial, metalMaterial } from "../../Helper/GLMaterials";

import InstantiatedMesh from "../InstanciatedMesh/InstantiatedMesh";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const bambuMaterial = materialCreator.createEmptyPhongMaterial("BambuLab");
bambuMaterial.color = new Color("#909090");
bambuMaterial.specular = new Color("#666");
bambuMaterial.reflectivity = 1;
bambuMaterial.shininess = 50;

interface BambuLabUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const BambuLabUI: React.FC<BambuLabUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const BambuLab: Mesh = nodes["bambu-lab-x1c"] as Mesh;
	const BambuLabFrontDoor: Mesh = nodes["bambuLabFrontDoor"] as Mesh;
	const BambuLabAMS: Mesh = nodes["bambuLabAMS"] as Mesh;
	const BambuLabAMSTop: Mesh = nodes["bambuLabAMSTop"] as Mesh;
	const BambuLabUI: Mesh = nodes["bambu-lab-x1c-ui"] as Mesh;
	const BambuLabUIDisplay: Mesh = nodes["bambu-lab-x1c-ui-display"] as Mesh;
	const BambuLabRods: Mesh = nodes["bambu-lab-x1c--nozzle-rods"] as Mesh;
	const BambuLabNozzle: Mesh = nodes["bambu-lab-x1c-nozzle"] as Mesh;
	const BambuLabNozzleSpike: Mesh = nodes["bambu-lab-x1c-nozzle-spike"] as Mesh;
	const BambuLabNozzleHole: Mesh = nodes["bambu-lab-x1c-nozzle-hole"] as Mesh;
	const BambuLabLogo: Mesh = nodes["bambu-lab-x1c-logo"] as Mesh;
	const PLAMaterialRoll: Mesh = nodes["PLARollHolder"] as Mesh;
	const PLAMaterial: Mesh = nodes["PLARoll"] as Mesh;

	const plaMaterialRollInstances = [
		{ position: [-2.759, 2.769, 2.466] as [number, number, number], rotation: [0, 0, -Math.PI / 2] as [number, number, number] },
		{ position: [-2.99, 2.769, 2.466] as [number, number, number], rotation: [0, 0, -Math.PI / 2] as [number, number, number] },
		{ position: [-3.217, 2.769, 2.466] as [number, number, number], rotation: [0, 0, -Math.PI / 2] as [number, number, number] },
		{ position: [-3.446, 2.769, 2.466] as [number, number, number], rotation: [0, 0, -Math.PI / 2] as [number, number, number] },
	];

	const plaMaterialInstances = [
		{
			position: [-2.759, 2.269, 2.375] as [number, number, number],
			rotation: [Math.PI / 2, 0, -Math.PI / 2] as [number, number, number],
			color: new Color("green"),
		},
		{
			position: [-2.99, 2.269, 2.375] as [number, number, number],
			rotation: [Math.PI / 2, 0, -Math.PI / 2] as [number, number, number],
			color: new Color("red"),
		},
		{
			position: [-3.217, 2.269, 2.375] as [number, number, number],
			rotation: [Math.PI / 2, 0, -Math.PI / 2] as [number, number, number],
			color: new Color("white"),
		},
		{
			position: [-3.446, 2.269, 2.375] as [number, number, number],
			rotation: [Math.PI / 2, 0, -Math.PI / 2] as [number, number, number],
			color: new Color("black"),
		},
	];

	console.log(BambuLab.scale);

	return (
		<group name={name}>
			{/** BambuLab Printer */}
			<mesh geometry={BambuLab.geometry} position={[-2.564, 1.624, 2.522]} rotation={BambuLab.rotation} scale={BambuLab.scale} material={bambuMaterial} />

			{/** BambuLab Logo on Printer */}
			<mesh
				geometry={BambuLabLogo.geometry}
				position={BambuLabLogo.position}
				rotation={BambuLabLogo.rotation}
				scale={BambuLabLogo.scale}
				material={blackPlasticMaterial}
			/>

			{/** BambuLab UI */}
			<mesh geometry={BambuLabUI.geometry} position={[-2.985, 2.243, 2.234]} rotation={BambuLabUI.rotation} scale={BambuLabUI.scale} material={bambuMaterial} />

			{/** BambuLab UI Touchscreen */}
			<mesh
				geometry={BambuLabUIDisplay.geometry}
				position={[-2.985, 2.243, 2.234]}
				rotation={BambuLabUIDisplay.rotation}
				scale={BambuLabUIDisplay.scale}
				material={blackPlasticMaterial}
			/>

			{/** BambuLab Nozzle housing*/}
			<mesh
				geometry={BambuLabNozzle.geometry}
				position={[-2.985, 2.243, 2.234]}
				rotation={BambuLabNozzle.rotation}
				scale={BambuLabNozzle.scale}
				material={deskMaterial}
			/>

			{/** BambuLab Nozzle spike */}
			<mesh
				geometry={BambuLabNozzleSpike.geometry}
				position={[-2.985, 2.243, 2.234]}
				rotation={BambuLabNozzleSpike.rotation}
				scale={BambuLabNozzleSpike.scale}
				material={goldMetalMaterial}
			/>

			{/** BambuLab Nozzle housing hole */}
			<mesh
				geometry={BambuLabNozzleHole.geometry}
				position={[-2.985, 2.243, 2.234]}
				rotation={BambuLabNozzleHole.rotation}
				scale={BambuLabNozzleHole.scale}
				material={blackPlasticMaterial}
			/>

			{/** BambuLab Front Door */}
			<mesh
				geometry={BambuLabFrontDoor.geometry}
				position={[-2.985, 2.243, 2.234]}
				rotation={BambuLabFrontDoor.rotation}
				scale={BambuLabFrontDoor.scale}
				material={glassMaterial}
			/>

			{/** BambuLab Nozzle rods */}
			<mesh
				geometry={BambuLabRods.geometry}
				position={[-2.985, 2.243, 2.234]}
				rotation={BambuLabRods.rotation}
				scale={BambuLabRods.scale}
				material={metalMaterial}
			/>

			{/** BambuLab AMS */}
			<mesh
				geometry={BambuLabAMS.geometry}
				position={[-2.985, 2.243, 2.234]}
				rotation={BambuLabAMS.rotation}
				scale={BambuLabAMS.scale}
				material={blackPlasticMaterial}
			/>

			{/** BambuLab AMS Opener door */}
			<mesh
				geometry={BambuLabAMSTop.geometry}
				position={[-2.985, 2.243, 2.234]}
				rotation={BambuLabAMSTop.rotation}
				scale={BambuLabAMSTop.scale}
				material={glassMaterial}
			/>

			{/** BambuLab Materials Rolls */}
			<InstantiatedMesh geometry={PLAMaterialRoll.geometry} material={metalMaterial} instance={plaMaterialRollInstances} />

			{/** BambuLab Material on Rolls */}
			<InstantiatedMesh geometry={PLAMaterial.geometry} material={new MeshPhongMaterial()} instance={plaMaterialInstances} name="PLAMaterial" />
		</group>
	);
};

export default BambuLabUI;
