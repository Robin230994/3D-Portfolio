import React, { RefObject, useMemo } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Color, Mesh, MeshBasicMaterial, Object3D } from "three";
import { DirectionalLight } from "three";
import { glassMaterial, metalMaterial } from "../../../Helper/GLMaterials";
import { Group } from "three";
import { useControls } from "leva";

import InstantiatedMesh from "../../InstanciatedMesh/InstantiatedMesh";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface BambuLabUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: { name: string; object: Object3D } | null;
				cameraIsMoving: boolean;
			};
		};
		functions: {
			myFunctions: {
				setSelectObjectFocus: React.Dispatch<React.SetStateAction<{ name: string; object: Object3D } | null>>;
				setIsAnyHovered: React.Dispatch<React.SetStateAction<boolean>>;
			};
		};
		refs: { myRefs: { bambuLabRef: RefObject<Group> } };
	};
}

const BambuLabUI: React.FC<BambuLabUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving } = myData;
	const { setSelectObjectFocus, setIsAnyHovered } = myFunctions;
	const { bambuLabRef } = myRefs;

	const BambuLabAMSOpener: Mesh = nodes["BambuLabAMSOpener"] as Mesh;
	const BambuLabDoor: Mesh = nodes["BambuLabDoor"] as Mesh;
	const PLAMaterialHolder: Mesh = nodes["PLAMaterialRollHolder"] as Mesh;
	const PLARollMaterial: Mesh = nodes["PLARollMaterial"] as Mesh;

	const { matHolder1Pos, matHolder2Pos, matHolder3Pos, matHolder4Pos, matHolderRot } = useControls("AMSMaterialHolder", {
		matHolder1Pos: { value: { x: -2.75, y: 2.8, z: 2.45 }, step: 0.01 },
		matHolder2Pos: { value: { x: -2.97, y: 2.8, z: 2.45 }, step: 0.01 },
		matHolder3Pos: { value: { x: -3.21, y: 2.8, z: 2.45 }, step: 0.01 },
		matHolder4Pos: { value: { x: -3.44, y: 2.8, z: 2.45 }, step: 0.01 },
		matHolderRot: { value: { x: 0, y: 0, z: -Math.PI / 2 } },
	});

	const { rollMat1Pos, rollMat2Pos, rollMat3Pos, rollMat4Pos, rollMatRot } = useControls("AMSRollMaterial", {
		rollMat1Pos: { value: { x: -2.75, y: 2.8, z: 2.44 }, step: 0.01 },
		rollMat2Pos: { value: { x: -2.975, y: 2.8, z: 2.44 }, step: 0.001 },
		rollMat3Pos: { value: { x: -3.205, y: 2.8, z: 2.44 }, step: 0.001 },
		rollMat4Pos: { value: { x: -3.435, y: 2.8, z: 2.44 }, step: 0.001 },
		rollMatRot: { value: { x: Math.PI / 2, y: 0, z: -Math.PI / 2 }, step: 0.01 },
	});

	const { backLabelPos } = useControls("BambuLab", {
		backLabelPos: { value: { x: -0.9, y: 0.2, z: 6.8 }, step: 0.1 },
	});

	const plaMaterialHolderInstances = useMemo(
		() => [
			{
				position: [matHolder1Pos.x, matHolder1Pos.y, matHolder1Pos.z] as [number, number, number],
				rotation: [matHolderRot.x, matHolderRot.y, matHolderRot.z] as [number, number, number],
				scale: [0.8, 0.8, 0.8] as [number, number, number],
			},
			{
				position: [matHolder2Pos.x, matHolder2Pos.y, matHolder2Pos.z] as [number, number, number],
				rotation: [matHolderRot.x, matHolderRot.y, matHolderRot.z] as [number, number, number],
				scale: [0.8, 0.8, 0.8] as [number, number, number],
			},
			{
				position: [matHolder3Pos.x, matHolder3Pos.y, matHolder3Pos.z] as [number, number, number],
				rotation: [matHolderRot.x, matHolderRot.y, matHolderRot.z] as [number, number, number],
				scale: [0.8, 0.8, 0.8] as [number, number, number],
			},
			{
				position: [matHolder4Pos.x, matHolder4Pos.y, matHolder4Pos.z] as [number, number, number],
				rotation: [matHolderRot.x, matHolderRot.y, matHolderRot.z] as [number, number, number],
				scale: [0.8, 0.8, 0.8] as [number, number, number],
			},
		],
		[
			matHolder1Pos.x,
			matHolder1Pos.y,
			matHolder1Pos.z,
			matHolder2Pos.x,
			matHolder2Pos.y,
			matHolder2Pos.z,
			matHolder3Pos.x,
			matHolder3Pos.y,
			matHolder3Pos.z,
			matHolder4Pos.x,
			matHolder4Pos.y,
			matHolder4Pos.z,
			matHolderRot.x,
			matHolderRot.y,
			matHolderRot.z,
		]
	);

	const plaRollMaterialInstances = useMemo(
		() => [
			{
				position: [rollMat1Pos.x, rollMat1Pos.y, rollMat1Pos.z] as [number, number, number],
				rotation: [rollMatRot.x, rollMatRot.y, rollMatRot.z] as [number, number, number],
				scale: [1, 1, 1] as [number, number, number],
				color: new Color("#ffffff"),
			},
			{
				position: [rollMat2Pos.x, rollMat2Pos.y, rollMat2Pos.z] as [number, number, number],
				rotation: [rollMatRot.x, rollMatRot.y, rollMatRot.z] as [number, number, number],
				scale: [1, 1, 1] as [number, number, number],
				color: new Color("#000000"),
			},
			{
				position: [rollMat3Pos.x, rollMat3Pos.y, rollMat3Pos.z] as [number, number, number],
				rotation: [rollMatRot.x, rollMatRot.y, rollMatRot.z] as [number, number, number],
				scale: [1, 1, 1] as [number, number, number],
				color: new Color("#8b0000"),
			},
			{
				position: [rollMat4Pos.x, rollMat4Pos.y, rollMat4Pos.z] as [number, number, number],
				rotation: [rollMatRot.x, rollMatRot.y, rollMatRot.z] as [number, number, number],
				scale: [1, 1, 1] as [number, number, number],
				color: new Color("#00008b"),
			},
		],
		[
			rollMat1Pos.x,
			rollMat1Pos.y,
			rollMat1Pos.z,
			rollMat2Pos.x,
			rollMat2Pos.y,
			rollMat2Pos.z,
			rollMat3Pos.x,
			rollMat3Pos.y,
			rollMat3Pos.z,
			rollMat4Pos.x,
			rollMat4Pos.y,
			rollMat4Pos.z,
			rollMatRot.x,
			rollMatRot.y,
			rollMatRot.z,
		]
	);

	return (
		<React.Fragment>
			<group
				name={name}
				ref={bambuLabRef}
				onClick={() => {
					if (bambuLabRef.current) {
						setSelectObjectFocus({ name: name, object: bambuLabRef.current });
					}
				}}
				onPointerOver={() => {
					if (selectObjectFocus === null) setIsAnyHovered(true);
				}}
				onPointerOut={() => setIsAnyHovered(false)}>
				{/** AMS Opener */}
				<mesh
					geometry={BambuLabAMSOpener.geometry}
					position={BambuLabAMSOpener.position}
					rotation={BambuLabAMSOpener.rotation}
					material={glassMaterial}
					scale={BambuLabAMSOpener.scale}
				/>

				{/** BambuLab Door */}
				<mesh
					geometry={BambuLabDoor.geometry}
					position={BambuLabDoor.position}
					rotation={BambuLabDoor.rotation}
					material={glassMaterial}
					scale={BambuLabDoor.scale}
				/>

				{/** PLA Material holder */}
				<InstantiatedMesh name="PLAMaterialHolder" instance={plaMaterialHolderInstances} geometry={PLAMaterialHolder.geometry} material={metalMaterial} />

				{/** PLA Roll Material */}
				<InstantiatedMesh name="PLARollMaterial" instance={plaRollMaterialInstances} geometry={PLARollMaterial.geometry} material={new MeshBasicMaterial()} />

				<InteractionLabel
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					dispatch={() => setSelectObjectFocus(null)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
						<path
							fillRule="evenodd"
							d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</InteractionLabel>
			</group>
			{/* </Select> */}
		</React.Fragment>
	);
};

export default BambuLabUI;
