import React, { RefObject, useEffect } from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { BoxGeometry, DirectionalLight, Material, Mesh, PlaneGeometry } from "three";
import { CameraControls } from "@react-three/drei";
import { useControls } from "leva";
import MaterialCreator from "../../classes/MaterialCreator";

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
		refs: { myRefs: { cameraControls: RefObject<CameraControls> } };
	};
}

const DesksUI: React.FC<DesksUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;
	const { cameraControls } = myRefs;

	const DeskObjects: Mesh = nodes["desk_objects_t1"] as Mesh;
	const deskMaterial = DeskObjects.material as Material;

	const { width, height, depth, position, rotation } = useControls("LampEmission", {
		width: { value: 2.5, step: 0.1 },
		height: { value: 0.1, step: 0.1 },
		depth: { value: 0.63, step: 0.1 },
		position: { value: { x: 0, y: 4.25, z: 0 }, step: 0.1 },
		rotation: { value: { x: 0, y: 0, z: 0 } },
	});

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
		</group>
	);
};

export default DesksUI;
