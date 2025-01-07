import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";

interface MusterboxUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const MusterboxUI: React.FC<MusterboxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;
	const MusterboxBottom: Mesh = nodes["MusterboxBoden"] as Mesh;
	const MusterboxInside: Mesh = nodes["MusterboxInside"] as Mesh;

	return (
		<group name={name} position={[-3.183, 2.3, -2.625]} rotation={[-Math.PI / 2, 0, Math.PI]}>
			<mesh geometry={MusterboxBottom.geometry} position={MusterboxBottom.position} rotation={MusterboxBottom.rotation} scale={0.009}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={MusterboxInside.geometry} position={[0, 0.14, -0]} rotation={[0, 0, -Math.PI / 2]} scale={0.009}>
				<meshStandardMaterial />
			</mesh>
		</group>
	);
};

export default MusterboxUI;
