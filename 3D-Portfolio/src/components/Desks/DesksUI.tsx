import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { Color, DirectionalLight, DoubleSide, Mesh, MeshStandardMaterial } from "three";
import { useControls } from "leva";
import { blackPlasticMaterial, cupboardDoorMaterial, deskMaterial, greenPlasticMaterial, metalMaterial } from "../../Helper/GLMaterials";

import OcculusQuest from "../OccolusQuest/OcculusQuest";
import Macbook from "../Macbook/Macbook";
import MaterialCreator from "../../classes/MaterialCreator";
import IPhone from "../iPhone/iPhone";
import InstantiatedMesh from "../InstanciatedMesh/InstantiatedMesh";

const materialCreator = MaterialCreator.getInstance();
const deskStandMaterial = materialCreator.createEmptyStandardMaterial("DeskStands");
deskStandMaterial.color = metalMaterial.color;
deskStandMaterial.metalness = metalMaterial.metalness;
deskStandMaterial.roughness = 0.5;

interface DesksUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
			};
		};
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const DesksUI: React.FC<DesksUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const DeskWorkingAreas: Mesh = nodes["DeskWorkingAreas"] as Mesh;
	const DeskStands: Mesh = nodes["DeskStands"] as Mesh;
	const DeskDoors: Mesh = nodes["CupboardDoors"] as Mesh;
	const DeskOpeners: Mesh = nodes["CupboardOpeners"] as Mesh;
	const DeskRoll: Mesh = nodes["Rolls"] as Mesh;
	const Organizer: Mesh = nodes["Organizer"] as Mesh;
	const Paper: Mesh = nodes["Paper"] as Mesh;
	const Notebooks: Mesh = nodes["Books"] as Mesh;
	const Penholder: Mesh = nodes["PenHolderMesh"] as Mesh;
	const Book: Mesh = nodes["GreenBook"] as Mesh;

	const deskParams = useControls("Desk", {
		metalness: { value: 0, min: 0, max: 1, step: 0.01 },
		roughness: { value: 0.75, min: 0, max: 1, step: 0.01 },
		color: "#b4b9b2",
	});

	const rollInstances = [
		{ position: [2.35, 0.1, 2.0] as [number, number, number], rotation: [0, -2.6, 0] as [number, number, number] },
		{ position: [1.53, 0.1, 1.95] as [number, number, number], rotation: [0, -1.5, 0] as [number, number, number] },
		{ position: [1.53, 0.1, 2.6] as [number, number, number], rotation: [0, -1.5, 0] as [number, number, number] },
		{ position: [2.35, 0.1, 2.7] as [number, number, number], rotation: [0, -2.6, 0] as [number, number, number] },
	];

	const bookInstances = [
		{
			position: [0.027, 0.1, 0.017] as [number, number, number],
			rotation: [1.571, 0.003, -1.57] as [number, number, number],
			color: new Color("#5C8408"),
		},
		{
			position: [0.049, 0.1, 0.006] as [number, number, number],
			rotation: [1.571, 0.003, -1.57] as [number, number, number],
			color: new Color("#000000"),
		},
		{
			position: [0.075, 0.1, 0.006] as [number, number, number],
			rotation: [1.571, 0.1, -1.57] as [number, number, number],
			scale: [1, 0.5, 1] as [number, number, number],
			color: new Color("#ffffff"),
		},
		{
			position: [0.09, 0.1189, 0.006] as [number, number, number],
			rotation: [1.57, 0.18, -1.57] as [number, number, number],
			scale: [1, 0.5, 1.2] as [number, number, number],
			color: new Color("#867972"),
		},
		{
			position: [0.13, 0.1189, 0.006] as [number, number, number],
			rotation: [1.57, 0.003, -1.57] as [number, number, number],
			scale: [1, 1.3, 1.2] as [number, number, number],
			color: new Color("#522F0C"),
		},
		{
			position: [0.165, 0.1089, 0.006] as [number, number, number],
			rotation: [1.57, 0.003, -1.57] as [number, number, number],
			scale: [1, 2, 1.1] as [number, number, number],
			color: new Color("#4A3D39"),
		},
		{
			position: [0.201, 0.1, 0.006] as [number, number, number],
			rotation: [1.57, 0.08, -1.57] as [number, number, number],
			scale: [1, 0.7, 1] as [number, number, number],
			color: new Color("#6E2032"),
		},
		{
			position: [0.222, 0.1089, 0.006] as [number, number, number],
			rotation: [1.57, 0.13, -1.57] as [number, number, number],
			scale: [1, 0.7, 1.1] as [number, number, number],
			color: new Color("#867972"),
		},
		{
			position: [0.237, 0.1189, 0.006] as [number, number, number],
			rotation: [1.57, 0.13, -1.57] as [number, number, number],
			scale: [1, 0.7, 1.2] as [number, number, number],
			color: new Color("#000000"),
		},
	];

	return (
		<group name={name}>
			{/** Working areas */}
			<mesh geometry={DeskWorkingAreas.geometry} position={DeskWorkingAreas.position} rotation={DeskWorkingAreas.rotation} material={deskMaterial} />

			{/** Desk stands */}
			<mesh geometry={DeskStands.geometry} position={DeskStands.position} rotation={DeskStands.rotation} material={deskStandMaterial} />

			{/** Desk doors */}
			<mesh geometry={DeskDoors.geometry} position={DeskDoors.position} rotation={DeskDoors.rotation} material={cupboardDoorMaterial} />

			{/** Desk door openers */}
			<mesh geometry={DeskOpeners.geometry} position={DeskOpeners.position} rotation={DeskOpeners.rotation} material={metalMaterial} />

			{/** Small Desk Rolls */}
			<InstantiatedMesh geometry={DeskRoll.geometry} material={blackPlasticMaterial} instance={rollInstances} />

			{/** Organizer */}
			<group name="organizer">
				<mesh geometry={Organizer.geometry} position={Organizer.position} rotation={Organizer.rotation} material={greenPlasticMaterial} />

				<mesh geometry={Paper.geometry} position={[4.33, 1.255, -2.509]} rotation={Paper.rotation} scale-y={0.01}>
					<meshStandardMaterial />
				</mesh>
			</group>

			{/** Notebooks */}
			{/* <group name="Notebooks" position={[3.812, 1.18, -2.692]}>
				<mesh geometry={Notebooks.geometry} rotation={Notebooks.rotation}>
					<meshStandardMaterial color={"brown"} />
				</mesh>
			</group> */}

			{/* <group name="Penholder" position={[4.768, 1.22, -2.744]}>
				<mesh geometry={Penholder.geometry} rotation={Penholder.rotation} material={penHolderMaterial} />
			</group> */}

			{/** Occulus Quest */}
			<OcculusQuest name="Occulus" nodes={nodes} />

			{/** Macbook */}
			<Macbook name="Macbook" nodes={nodes} />

			{/** Phone */}
			<IPhone name="iPhone" nodes={nodes} />

			{/** Desk books */}
			<group name="DeskBooks" position={[-0.415, 0.953, -2.344]} scale={1.743}>
				<InstantiatedMesh geometry={Book.geometry} instance={bookInstances} />
			</group>
		</group>
	);
};

export default DesksUI;
