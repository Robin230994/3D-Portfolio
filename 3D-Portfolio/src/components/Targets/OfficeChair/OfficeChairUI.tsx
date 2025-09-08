import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Mesh, Object3D } from "three";
import { DirectionalLight } from "three";
import { iot1Material, metalMaterial } from "../../../Helper/GLMaterials";
import { useControls } from "leva";
import InstantiatedMesh from "../../InstanciatedMesh/InstantiatedMesh";

interface OfficeChairUIProps extends IUIComponentProps {
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

const OfficeChairUI: React.FC<OfficeChairUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const UpperOfficeChair: Mesh = nodes["GamingChairUpper"] as Mesh;
	const LowerOfficeChair: Mesh = nodes["GamingChairLower"] as Mesh;
	const ChairRoll: Mesh = nodes["ChairRoll"] as Mesh;

	const { positionFR, positionSR, positionTR, positionFTR, positionFTH, rotationFR, rotationSR, rotationTR, rotationFTR, rotationFTH } = useControls(
		"ChairRollsOfficeChair",
		{
			positionFR: { value: { x: 5.33, y: 0.13, z: -0.59 }, step: 0.01 },
			positionSR: { value: { x: 5.85, y: 0.13, z: -0.85 }, step: 0.01 },
			positionTR: { value: { x: 6.26, y: 0.13, z: -0.43 }, step: 0.01 },
			positionFTR: { value: { x: 5.99, y: 0.13, z: 0.09 }, step: 0.01 },
			positionFTH: { value: { x: 5.41, y: 0.13, z: -0.01 }, step: 0.01 },
			rotationFR: { value: { x: 0, y: -1.18, z: 1.57 }, step: 0.01 },
			rotationSR: { value: { x: 0, y: -3.1, z: 1.57 }, step: 0.01 },
			rotationTR: { value: { x: 0, y: -5.23, z: 1.57 }, step: 0.01 },
			rotationFTR: { value: { x: 0, y: -5.23, z: 1.57 }, step: 0.01 },
			rotationFTH: { value: { x: 0, y: -7.35, z: 1.57 }, step: 0.01 },
		}
	);

	const chairRollInstances = [
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
		{
			position: [positionFTH.x, positionFTH.y, positionFTH.z] as [number, number, number],
			rotation: [rotationFTH.x, rotationFTH.y, rotationFTH.z] as [number, number, number],
			scale: [ChairRoll.scale.x, ChairRoll.scale.y, ChairRoll.scale.z] as [number, number, number],
		},
	];

	return (
		<group name={name}>
			<mesh
				geometry={UpperOfficeChair.geometry}
				position={UpperOfficeChair.position}
				rotation={UpperOfficeChair.rotation}
				scale={UpperOfficeChair.scale}
				material={iot1Material}
			/>

			<mesh
				geometry={LowerOfficeChair.geometry}
				position={LowerOfficeChair.position}
				rotation={LowerOfficeChair.rotation}
				scale={LowerOfficeChair.scale}
				material={metalMaterial}
			/>

			{/** Chair roll instances */}
			<InstantiatedMesh name="Chair-Roll-Instances" geometry={ChairRoll.geometry} instance={chairRollInstances} material={iot1Material} />
		</group>
	);
};

export default OfficeChairUI;
