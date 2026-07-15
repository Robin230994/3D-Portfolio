import React, { RefObject, useMemo } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Color, Mesh, MeshBasicMaterial, Object3D } from "three";
import { DirectionalLight } from "three";
import { glassMaterial, metalMaterial, t3Material } from "../../../Helper/GLMaterials";
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
				setSelectObjectFocus: (
					focus: {
						name: string;
						object: Object3D;
					} | null,
				) => void;
				setHoveredObject: (objectName: string | null) => void;
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
	const { setSelectObjectFocus, setHoveredObject } = myFunctions;
	const { bambuLabRef } = myRefs;

	const BambuLabAMS: Mesh = nodes["BambuAMSTop"] as Mesh;
	const BambuLabDoor: Mesh = nodes["BambuFrontDoor"] as Mesh;
	const BambuLab: Mesh = nodes["BambuLab"] as Mesh;
	const BambuLabNozzle: Mesh = nodes["BambuLabNozzle"] as Mesh;
	const PLARollHolder: Mesh = nodes["Circle001"] as Mesh;
	const PLARoll: Mesh = nodes["PLARoll"] as Mesh;

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

	const { backLabelPos, backLabelRot } = useControls("BambuLab", {
		backLabelPos: { value: { x: 0.7, y: 0.49, z: -0.09 }, step: 0.01 },
		backLabelRot: { value: { x: 0, y: -0.5, z: 0.05 }, step: 0.01 },
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
		],
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
		],
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
					if (selectObjectFocus === null) setHoveredObject(name);
				}}
				onPointerOut={() => setHoveredObject(null)}>
				{/** AMS */}
				<mesh
					geometry={BambuLabAMS.geometry}
					position={BambuLabAMS.position}
					rotation={BambuLabAMS.rotation}
					material={glassMaterial}
					scale={BambuLabAMS.scale}
				/>

				{/** Bambu Lab */}
				<mesh geometry={BambuLab.geometry} position={BambuLab.position} rotation={BambuLab.rotation} material={BambuLab.material} scale={BambuLab.scale} />

				{/** BambuLab Door */}
				<mesh
					geometry={BambuLabDoor.geometry}
					position={BambuLabDoor.position}
					rotation={BambuLabDoor.rotation}
					material={glassMaterial}
					scale={BambuLabDoor.scale}>
					<InteractionLabel
						name="bambu-ui-btn"
						labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
						labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
						scaleFactor={0.22}
						visible={!cameraIsMoving && selectObjectFocus?.name === name}
						dispatch={() => setSelectObjectFocus(null)}>
						x
					</InteractionLabel>
				</mesh>

				{/** PLA Material holder */}
				<InstantiatedMesh name="PLAMaterialHolder" instance={plaMaterialHolderInstances} geometry={PLARollHolder.geometry} material={metalMaterial} />

				{/** PLA Roll Material */}
				<InstantiatedMesh name="PLARoll" instance={plaRollMaterialInstances} geometry={PLARoll.geometry} material={new MeshBasicMaterial()} />
			</group>
			{/* </Select> */}
		</React.Fragment>
	);
};

export default BambuLabUI;
