import React, { MutableRefObject, RefObject } from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { Color, DirectionalLight, Mesh, Group, Object3DEventMap } from "three";
import { blackPlasticMaterial, brownPlasticMaterial, cupboardDoorMaterial, deskMaterial, metalMaterial } from "../../Helper/GLMaterials";
import { CameraControls } from "@react-three/drei";

import Macbook from "../Macbook/Macbook";
import OcculusQuest from "../OccolusQuest/OcculusQuest";
import MaterialCreator from "../../classes/MaterialCreator";
import InstantiatedMesh from "../InstanciatedMesh/InstantiatedMesh";
import BambuLab from "../BambuLab/BambuLab";
import FCBox from "../FCBox/FCBox";
import Musterbox from "../Musterbox/Musterbox";

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
		refs: { myRefs: { cameraControls: RefObject<CameraControls> } };
	};
}

const DesksUI: React.FC<DesksUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;
	const { cameraControls } = myRefs;

	const DeskWorkingAreas: Mesh = nodes["DeskWorkingAreas"] as Mesh;
	const DeskStands: Mesh = nodes["DeskStands"] as Mesh;
	const DeskDoors: Mesh = nodes["CupboardDoors"] as Mesh;
	const DeskOpeners: Mesh = nodes["CupboardOpeners"] as Mesh;
	const DeskRoll: Mesh = nodes["Rolls"] as Mesh;
	const Organizer: Mesh = nodes["Organizer"] as Mesh;
	const Paper: Mesh = nodes["Paper"] as Mesh;
	const Book: Mesh = nodes["GreenBook"] as Mesh;
	const Folders: Mesh = nodes["FolderDocuments"] as Mesh;

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
			<mesh
				geometry={DeskWorkingAreas.geometry}
				position={DeskWorkingAreas.position}
				rotation={DeskWorkingAreas.rotation}
				material={deskMaterial}
				receiveShadow
			/>

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
				<mesh geometry={Organizer.geometry} position={Organizer.position} rotation={Organizer.rotation} material={brownPlasticMaterial} />

				<mesh geometry={Paper.geometry} position={[4.33, 1.255, -2.509]} rotation={Paper.rotation} scale-y={0.01}>
					<meshStandardMaterial />
				</mesh>
			</group>

			{/** Occulus Quest */}
			<OcculusQuest name="Occulus" nodes={nodes} cameraControls={cameraControls} />

			{/** Macbook */}
			<Macbook name="Macbook" nodes={nodes} cameraControls={cameraControls} />

			{/** Folders */}
			<mesh geometry={Folders.geometry} position={Folders.position} rotation={Folders.rotation} material={brownPlasticMaterial} />

			{/** Desk books */}
			<group name="DeskBooks" position={[-0.415, 0.953, -2.344]} scale={1.743}>
				<InstantiatedMesh geometry={Book.geometry} instance={bookInstances} />
			</group>

			{/** Franconian coolness box */}
			<FCBox name="Franconian Coolness" nodes={nodes} cameraControls={cameraControls} />

			{/** BambuLab Printer */}
			<BambuLab name="BambuLab" nodes={nodes} cameraControls={cameraControls} />

			{/** Musterbox */}
			{/* <Musterbox name="Musterbox" nodes={nodes} /> */}
		</group>
	);
};

export default DesksUI;
