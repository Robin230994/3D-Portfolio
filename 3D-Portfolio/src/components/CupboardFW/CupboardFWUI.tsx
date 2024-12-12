import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { Mesh } from "three";
import { DirectionalLight } from "three";

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

	const CupboardFW: Mesh = nodes["CupboardFW"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={CupboardFW.geometry} position={CupboardFW.position} rotation={CupboardFW.rotation}></mesh>
		</group>
	);
};

export default CupboardFWUI;
