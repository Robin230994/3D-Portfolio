import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { useControls } from "leva";
import { deskMaterial, metalMaterial } from "../../Helper/GLMaterials";

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
	const MainDeskStands: Mesh = nodes["StandsMD"] as Mesh;

	const deskParams = useControls("Desk", {
		metalness: { value: 0, min: 0, max: 1, step: 0.01 },
		roughness: { value: 0.75, min: 0, max: 1, step: 0.01 },
		color: "#b4b9b2",
	});

	return (
		<group name={name}>
			{/** Working area */}
			<mesh geometry={MainDesk.geometry} position={MainDesk.position} rotation={MainDesk.rotation} material={deskMaterial} />

			{/** Desk stands */}
			<mesh geometry={MainDeskStands.geometry} position={MainDeskStands.position} rotation={MainDeskStands.rotation}>
				<meshStandardMaterial {...metalMaterial} roughness={0.1} />
			</mesh>
		</group>
	);
};

export default MainDeskUI;
