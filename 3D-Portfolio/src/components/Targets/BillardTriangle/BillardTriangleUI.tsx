import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { t3Material } from "../../../Helper/GLMaterials";

interface BillardTriangleUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const BillardTriangleUI: React.FC<BillardTriangleUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const PoolBall8: Mesh = nodes["PoolBall8"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={PoolBall8.geometry} material={t3Material} position={PoolBall8.position} rotation={PoolBall8.rotation} />
		</group>
	);
};

export default BillardTriangleUI;
