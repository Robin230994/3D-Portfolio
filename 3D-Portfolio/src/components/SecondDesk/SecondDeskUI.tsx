import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { Mesh } from "three";
import { DirectionalLight } from "three";
import { deskMaterial, metalMaterial } from "../../Helper/GLMaterials";

interface SecondDeskUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const SecondDeskUI: React.FC<SecondDeskUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const SecondDesk: Mesh = nodes["WorkingAreaSD"] as Mesh;
	const SecondDeskStands: Mesh = nodes["StandsSD"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={SecondDesk.geometry} position={SecondDesk.position} rotation={SecondDesk.rotation} material={deskMaterial} />

			<mesh geometry={SecondDeskStands.geometry} position={SecondDeskStands.position} rotation={SecondDeskStands.rotation}>
				<meshStandardMaterial {...metalMaterial} roughness={0.1} />
			</mesh>
		</group>
	);
};

export default SecondDeskUI;
