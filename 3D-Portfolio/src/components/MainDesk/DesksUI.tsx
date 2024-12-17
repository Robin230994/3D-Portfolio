import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { useControls } from "leva";
import { cupboardDoorMaterial, deskMaterial, greenPlasticMaterial, metalMaterial } from "../../Helper/GLMaterials";

import OcculusQuest from "../OccolusQuest/OcculusQuest";
import Macbook from "../Macbook/Macbook";
import MaterialCreator from "../../classes/MaterialCreator";

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
	const Organizer: Mesh = nodes["Organizer"] as Mesh;
	const Paper: Mesh = nodes["Paper"] as Mesh;
	const Notebooks: Mesh = nodes["Books"] as Mesh;
	const Penholder: Mesh = nodes["PenHolderMesh"] as Mesh;

	const deskParams = useControls("Desk", {
		metalness: { value: 0, min: 0, max: 1, step: 0.01 },
		roughness: { value: 0.75, min: 0, max: 1, step: 0.01 },
		color: "#b4b9b2",
	});

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

			{/** Organizer */}
			<group name="organizer">
				<mesh geometry={Organizer.geometry} position={Organizer.position} rotation={Organizer.rotation} material={greenPlasticMaterial} />

				{/* <mesh geometry={Paper.geometry} position={[4.33, 1.255, -2.509]} rotation={Paper.rotation} scale-y={0.01}>
					<meshStandardMaterial />
				</mesh> */}
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
		</group>
	);
};

export default DesksUI;
