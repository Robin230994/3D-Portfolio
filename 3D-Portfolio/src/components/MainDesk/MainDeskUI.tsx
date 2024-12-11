import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { useControls } from "leva";
import { deskMaterial } from "../../Helper/GLMaterials";

interface MainDeskUIProps extends IUIComponentProps {
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

const MainDeskUI: React.FC<MainDeskUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const MainDesk: Mesh = nodes["WorkingAreaMD"] as Mesh;

	const deskParams = useControls("Desk", {
		metalness: { value: 0, min: 0, max: 1, step: 0.01 },
		roughness: { value: 0.75, min: 0, max: 1, step: 0.01 },
		color: "#b4b9b2",
	});

	return (
		<group name={name}>
			<mesh geometry={MainDesk.geometry} position={MainDesk.position} rotation={MainDesk.rotation}>
				<meshStandardMaterial {...deskMaterial} color={deskParams.color} metalness={deskParams.metalness} roughness={deskParams.roughness} />
			</mesh>
		</group>
	);
};

export default MainDeskUI;
