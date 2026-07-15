import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Mesh } from "three/src/objects/Mesh.js";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";

interface PictureFrameUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
			};
		};
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const PictureFrameUI: React.FC<PictureFrameUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const PictureFrame: Mesh = nodes["Picture_Frame001"] as Mesh;

	return (
		<group name={name}>
			<mesh
				geometry={PictureFrame.geometry}
				position={PictureFrame.position}
				rotation={PictureFrame.rotation}
				material={PictureFrame.material}
				scale={PictureFrame.scale}
			/>
		</group>
	);
};

export default PictureFrameUI;
