import { Color, Mesh } from "three";
import { glassMaterial } from "../../Helper/GLMaterials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const windowBorderMaterial = materialCreator.createEmptyStandardMaterial("WindowBorder");
windowBorderMaterial.color = new Color("#000000");

const Window: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Window: Mesh = nodes["WindowGlass"] as Mesh;
	const WindowBorder: Mesh = nodes["WindowBorder"] as Mesh;

	return (
		<group name={name}>
			{/** Glass */}
			<mesh geometry={Window.geometry} position={Window.position}>
				<meshStandardMaterial {...glassMaterial} />
			</mesh>

			{/** Window border */}
			<mesh geometry={WindowBorder.geometry} position={WindowBorder.position}>
				<meshStandardMaterial {...windowBorderMaterial} />
			</mesh>
		</group>
	);
};

export default Window;
