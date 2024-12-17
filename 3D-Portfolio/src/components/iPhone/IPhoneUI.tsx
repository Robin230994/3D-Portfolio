import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { Mesh } from "three";
import { DirectionalLight } from "three";

interface iPhoneUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const IPhoneUI: React.FC<iPhoneUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const iPhone: Mesh = nodes["MainPhoneCase"] as Mesh;
	const iPhoneCameraOutline: Mesh = nodes["CameraOutline"] as Mesh;
	const iPhoneLences: Mesh = nodes["iPhoneLences"] as Mesh;

	return (
		<>
			<group name={name} position={[6.408, 1.302, -1.846]}>
				<mesh geometry={iPhone.geometry} position={[-0.002, 0.009, 0]} rotation={[1.204, -Math.PI / 2, 0]}>
					<meshStandardMaterial color={"#717378"} roughness={0.63} />
				</mesh>

				<mesh geometry={iPhoneCameraOutline.geometry} position={[-0.05, -0.002, -0.013]} rotation={[1.204, -Math.PI / 2, 0]}>
					<meshStandardMaterial color={"#717378"} roughness={0.63} />
				</mesh>

				<mesh geometry={iPhoneLences.geometry} position={[-0.05, 0.001, -0.004]} rotation={[1.204, -Math.PI / 2, 0]}>
					<meshStandardMaterial color={"#717378"} roughness={0.63} />
				</mesh>
			</group>
		</>
	);
};

export default IPhoneUI;
