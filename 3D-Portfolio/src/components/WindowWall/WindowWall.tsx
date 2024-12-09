import { MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const windowWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("WindowWall", {
	diffuseT: "/baked-textures/Walls/Window/window_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Window/window_wall_roughness.webp",
	normalT: "/baked-textures/Walls/Window/window_wall_normal.png",
});

const WindowWall: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry}>
			<meshStandardMaterial {...windowWallMaterial} />
		</mesh>
	);
};

export default WindowWall;
