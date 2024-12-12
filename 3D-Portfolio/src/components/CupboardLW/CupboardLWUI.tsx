import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { cupboardDoorMaterial, deskMaterial, metalMaterial } from "../../Helper/GLMaterials";

interface CupboardLWUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const CupboardLWUI: React.FC<CupboardLWUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const CupboardLW: Mesh = nodes["LWCupboardStand"] as Mesh;
	const CupboardLWDoors: Mesh = nodes["DoorsCLW"] as Mesh;
	const CupboardLWOpeners: Mesh = nodes["Openers"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={CupboardLW.geometry} position={CupboardLW.position} rotation={CupboardLW.rotation} material={deskMaterial} />

			<mesh geometry={CupboardLWDoors.geometry} position={CupboardLWDoors.position} rotation={CupboardLWDoors.rotation} material={cupboardDoorMaterial} />

			<mesh geometry={CupboardLWOpeners.geometry} position={[-5.94, 2.05, 0.16]} rotation={[0, 1.6, 0]} material={metalMaterial} />
		</group>
	);
};

export default CupboardLWUI;
