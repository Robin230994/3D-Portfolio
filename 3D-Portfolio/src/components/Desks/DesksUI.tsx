import React, { useEffect } from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { BoxGeometry, DirectionalLight, Material, Mesh } from "three";
import { useControls } from "leva";
import { iot1Material } from "../../Helper/GLMaterials";
import MaterialCreator from "../../classes/MaterialCreator";
import InstantiatedMesh from "../InstanciatedMesh/InstantiatedMesh";

const materialCreator = MaterialCreator.getInstance();

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
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const DeskObjects: Mesh = nodes["desk_objects_t1"] as Mesh;
	const ChairRoll: Mesh = nodes["ChairRoll"] as Mesh;

	const deskMaterial = DeskObjects.material as Material;

	const { width, height, depth, position, rotation } = useControls("LampEmission", {
		width: { value: 2.5, step: 0.1 },
		height: { value: 0.1, step: 0.1 },
		depth: { value: 0.63, step: 0.1 },
		position: { value: { x: 0, y: 4.25, z: 0 }, step: 0.1 },
		rotation: { value: { x: 0, y: 0, z: 0 } },
	});

	const { positionFR, rotationFR, positionSR, rotationSR, positionTR, rotationTR, positionFTR, rotationFTR } = useControls("DeskRolls", {
		positionFR: { value: { x: 1.56, y: 0.13, z: 2.12 }, step: 0.01 },
		positionSR: { value: { x: 2.2, y: 0.13, z: 2.12 }, step: 0.01 },
		positionTR: { value: { x: 2.2, y: 0.13, z: 2.74 }, step: 0.01 },
		positionFTR: { value: { x: 1.56, y: 0.13, z: 2.74 }, step: 0.01 },
		rotationFR: { value: { x: 0, y: Math.PI, z: 1.57 }, step: 0.01 },
		rotationSR: { value: { x: 0, y: Math.PI, z: 1.57 }, step: 0.01 },
		rotationTR: { value: { x: 0, y: Math.PI, z: 1.57 }, step: 0.01 },
		rotationFTR: { value: { x: 0, y: Math.PI, z: 1.57 }, step: 0.01 },
	});

	const deskRollsInstance = [
		{
			position: [positionFR.x, positionFR.y, positionFR.z] as [number, number, number],
			rotation: [rotationFR.x, rotationFR.y, rotationFR.z] as [number, number, number],
			scale: [ChairRoll.scale.x, ChairRoll.scale.y, ChairRoll.scale.z] as [number, number, number],
		},
		{
			position: [positionSR.x, positionSR.y, positionSR.z] as [number, number, number],
			rotation: [rotationSR.x, rotationSR.y, rotationSR.z] as [number, number, number],
			scale: [ChairRoll.scale.x, ChairRoll.scale.y, ChairRoll.scale.z] as [number, number, number],
		},
		{
			position: [positionTR.x, positionTR.y, positionTR.z] as [number, number, number],
			rotation: [rotationTR.x, rotationTR.y, rotationTR.z] as [number, number, number],
			scale: [ChairRoll.scale.x, ChairRoll.scale.y, ChairRoll.scale.z] as [number, number, number],
		},
		{
			position: [positionFTR.x, positionFTR.y, positionFTR.z] as [number, number, number],
			rotation: [rotationFTR.x, rotationFTR.y, rotationFTR.z] as [number, number, number],
			scale: [ChairRoll.scale.x, ChairRoll.scale.y, ChairRoll.scale.z] as [number, number, number],
		},
	];

	useEffect(() => {
		materialCreator.addInstanciatedMaterial("deskMaterial", deskMaterial);
	}, [deskMaterial]);

	return (
		<group name={name}>
			{/** Desk object */}
			<mesh geometry={DeskObjects.geometry} position={DeskObjects.position} rotation={DeskObjects.rotation} material={deskMaterial} />

			{/** Roof lamp emission */}
			<mesh geometry={new BoxGeometry(width, height, depth)} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
				<meshStandardMaterial color={"#ffffff"} />
			</mesh>

			{/** Desk chair roll instances  */}
			<InstantiatedMesh name="Desk-Rolls" geometry={ChairRoll.geometry} instance={deskRollsInstance} material={iot1Material} />
		</group>
	);
};

export default DesksUI;
