import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { deskMaterial } from "../../Helper/GLMaterials";
import { useControls } from "leva";

const MainDesk: React.FC<CustomMeshProps> = ({ name, nodes }) => {
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

export default MainDesk;
