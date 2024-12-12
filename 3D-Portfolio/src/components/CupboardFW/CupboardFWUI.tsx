import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { Mesh } from "three";
import { DirectionalLight } from "three";
import { cupboardDoorMaterial, deskMaterial } from "../../Helper/GLMaterials";

interface CupboardFWUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const CupboardFWUI: React.FC<CupboardFWUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const CupboardFW: Mesh = nodes["FWCupboardStand"] as Mesh;
	const CupboardFWDoors: Mesh = nodes["DoorsCFW"] as Mesh;
	const CupboardFWSplit: Mesh = nodes["DoorSplit"] as Mesh;
	const CupboardFWOpeners: Mesh = nodes["Openers"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={CupboardFW.geometry} position={CupboardFW.position} rotation={CupboardFW.rotation} material={deskMaterial} />

			<mesh geometry={CupboardFWDoors.geometry} position={CupboardFWDoors.position} rotation={CupboardFWDoors.rotation} material={cupboardDoorMaterial}></mesh>

			<mesh geometry={CupboardFWSplit.geometry} position={CupboardFWSplit.position} rotation={CupboardFWSplit.rotation}></mesh>

			<mesh geometry={CupboardFWOpeners.geometry} position={CupboardFWOpeners.position} rotation={CupboardFWOpeners.rotation}></mesh>
		</group>
	);
};

export default CupboardFWUI;
