import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { useControls } from "leva";
import { blackPlasticMaterial, deskMaterial, metalMaterial } from "../../Helper/GLMaterials";

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
	const Organizer: Mesh = nodes["Organizer"] as Mesh;
	const Paper: Mesh = nodes["Paper"] as Mesh;
	const NotebookPages: Mesh = nodes["Cube091"] as Mesh;
	const NotebookBorders: Mesh = nodes["Cube091_1"] as Mesh;
	const Notebooks: Mesh = nodes["Cube091_2"] as Mesh;
	const PenholderCase: Mesh = nodes["Cube096"] as Mesh;
	const PenholderPaper: Mesh = nodes["Cube096_1"] as Mesh;
	const PenholderClamps: Mesh = nodes["Cube096_3"] as Mesh;
	const Penholder: Mesh = nodes["Cube096_5"] as Mesh;

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

			{/** Organizer */}
			<group name="organizer">
				<mesh geometry={Organizer.geometry} position={Organizer.position} rotation={Organizer.rotation} material={blackPlasticMaterial}>
					<meshStandardMaterial />
				</mesh>

				<mesh geometry={Paper.geometry} position={[4.33, 1.255, -2.509]} rotation={Paper.rotation} scale-y={0.01}>
					<meshStandardMaterial />
				</mesh>
			</group>

			{/** Notebooks */}
			<group name="Notebooks" position={[3.812, 1.18, -2.692]}>
				<mesh geometry={NotebookPages.geometry} rotation={NotebookPages.rotation}>
					<meshStandardMaterial />
				</mesh>

				<mesh geometry={NotebookBorders.geometry} rotation={NotebookBorders.rotation}>
					<meshStandardMaterial color={"#ffffff"} />
				</mesh>

				<mesh geometry={Notebooks.geometry} rotation={Notebooks.rotation}>
					<meshStandardMaterial color={"#ffffff"} />
				</mesh>
			</group>

			<group name="Penholder" position={[4.768, 1.22, -2.744]}>
				<mesh geometry={PenholderCase.geometry} rotation={PenholderCase.rotation}>
					<meshStandardMaterial color="black" />
				</mesh>
				<mesh geometry={PenholderPaper.geometry} rotation={PenholderPaper.rotation} />
				<mesh geometry={PenholderClamps.geometry} rotation={PenholderClamps.rotation} />
				<mesh geometry={Penholder.geometry} rotation={Penholder.rotation} />
			</group>
		</group>
	);
};

export default MainDeskUI;
