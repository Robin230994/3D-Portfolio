import { Mesh, MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const backWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("BackWall", {
	diffuseT: "/baked-textures/Walls/Back/back_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Back/back_wall_roughness.webp",
	normalT: "/baked-textures/Walls/Back/back_wall_normal.png",
});

const leftWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("LeftWall", {
	diffuseT: "/baked-textures/Walls/Left/left_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Left/left_wall_roughness.webp",
	normalT: "/baked-textures/Walls/Left/left_wall_normal.png",
});

const frontWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("FrontWall", {
	diffuseT: "/baked-textures/Walls/Front/walls_color.webp",
	roughnessT: "/baked-textures/Walls/Front/walls_roughness.webp",
	normalT: "/baked-textures/Walls/Front/walls_normal.jpg",
});

const windowWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("WindowWall", {
	diffuseT: "/baked-textures/Walls/Window/window_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Window/window_wall_roughness.webp",
	normalT: "/baked-textures/Walls/Window/window_wall_normal.png",
});

const roofMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Roof", {
	diffuseT: "/baked-textures/Roof/roof_baked_color.jpg",
	roughnessT: "/baked-textures/Roof/roof_baked_roughness.jpg",
	normalT: "/baked-textures/Roof/roof_baked_normal.png",
});

const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Floor", {
	diffuseT: "/baked-textures/Floor/floor_baked_color.jpg",
	roughnessT: "/baked-textures/Floor/floor_baked_roughness.jpg",
	normalT: "/baked-textures/Floor/floor_baked_normal.png",
});

const Foundation: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const LeftWall: Mesh = nodes["LeftWall"] as Mesh;
	const BackWall: Mesh = nodes["BackWall"] as Mesh;
	const FrontWall: Mesh = nodes["FrontWall"] as Mesh;
	const WindowWall: Mesh = nodes["WindowWall"] as Mesh;
	const Roof: Mesh = nodes["Roof"] as Mesh;
	const Floor: Mesh = nodes["Floor"] as Mesh;

	return (
		<group name={name}>
			{/** LeftWall */}
			<mesh geometry={LeftWall.geometry} position={LeftWall.position}>
				<meshStandardMaterial {...leftWallMaterial} />
			</mesh>

			{/** BackWall */}
			<mesh geometry={BackWall.geometry} position={BackWall.position}>
				<meshStandardMaterial {...backWallMaterial} />
			</mesh>

			{/** FrontWall */}
			<mesh geometry={FrontWall.geometry} position={FrontWall.position}>
				<meshStandardMaterial {...frontWallMaterial} />
			</mesh>

			{/** WindowWall */}
			<mesh geometry={WindowWall.geometry} position={WindowWall.position}>
				<meshStandardMaterial {...windowWallMaterial} />
			</mesh>

			{/** Roof */}
			<mesh geometry={Roof.geometry} position={Roof.position}>
				<meshStandardMaterial {...roofMaterial} />
			</mesh>

			{/** Floor */}
			<mesh geometry={Floor.geometry} position={Floor.position}>
				<meshStandardMaterial {...floorMaterial} />
			</mesh>
		</group>
	);
};

export default Foundation;
