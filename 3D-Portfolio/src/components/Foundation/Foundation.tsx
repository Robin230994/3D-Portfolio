import { DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { Texture } from "three";

import MaterialCreator from "../../classes/MaterialCreator";
import { sRGBEncoding } from "@react-three/drei/helpers/deprecated";
import { ClampToEdgeWrapping } from "three";

const materialCreator = MaterialCreator.getInstance();

const leftWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("LeftWall", {
	diffuseT: "/baked-textures/Walls/Left/left_wall_lighting_baked.jpg",
	roughnessT: "/baked-textures/Walls/Left/left_wall_lighting_baked_roughness.jpg",
	normalT: "/baked-textures/Walls/Left/left_wall_lighting_baked_normal.png",
});

// const frontWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("FrontWall", {
// 	diffuseT: "/baked-textures/Walls/Front/front_wall_lighting_baked.jpg",
// });

const wallsTexture = materialCreator.loadTexture("/baked-textures/Walls/Combined/walls_lighting_baked.jpg", (texture) => {
	texture.repeat.set(1, 1);
	texture.flipY = false;
	wallsTexture.wrapS = ClampToEdgeWrapping;
	wallsTexture.wrapT = ClampToEdgeWrapping;
	texture.needsUpdate = true;
}) as Texture;

const wallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Walls", {
	diffuseT: wallsTexture,
	normalT: "/baked-textures/Walls/Combined/walls_lighting_baked_normal.png",
});

const windowWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("WindowWall", {
	diffuseT: "/baked-textures/Walls/Window/window_wall_lighting_baked.jpg",
	roughnessT: "/baked-textures/Walls/Window/window_wall_lighting_baked_roughness.jpg",
	normalT: "/baked-textures/Walls/Window/window_wall_lighting_baked_normal.png",
});

const backWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("BackWall", {
	diffuseT: "/baked-textures/Walls/Back/back_wall_lighting_baked.jpg",
	roughnessT: "/baked-textures/Walls/Back/back_wall_lighting_roughness.jpg",
	normalT: "/baked-textures/Walls/Back/back_wall_lighting_normal.png",
});

const roofMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Roof", {
	diffuseT: "/baked-textures/Roof/roof_lighting_baked.jpg",
	roughnessT: "/baked-textures/Roof/roof_baked_roughness.jpg",
	normalT: "/baked-textures/Roof/roof_baked_normal.png",
});
// darken texture a bit so the diffuse color is not to bright
roofMaterial.color.setRGB(0.3, 0.3, 0.3);

const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Floor", {
	diffuseT: "/baked-textures/Floor/floor_bottom_baked.jpg",
	roughnessT: "/baked-textures/Floor/floor_baked_roughness.webp",
	normalT: "/baked-textures/Floor/floor_baked_normal.png",
});

const Foundation: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	// const LeftWall: Mesh = nodes["LeftWall"] as Mesh;
	// const BackWall: Mesh = nodes["BackWall"] as Mesh;
	// const FrontWall: Mesh = nodes["FrontWall"] as Mesh;
	// const WindowWall: Mesh = nodes["WindowWall"] as Mesh;
	const Walls: Mesh = nodes["Walls"] as Mesh;
	const Roof: Mesh = nodes["Roof"] as Mesh;
	const Floor: Mesh = nodes["Floor"] as Mesh;

	return (
		<group name={name}>
			{/** LeftWall */}
			{/* <mesh geometry={LeftWall.geometry} position={LeftWall.position} material={leftWallMaterial} /> */}

			{/** BackWall */}
			{/* <mesh geometry={BackWall.geometry} position={BackWall.position}>
				<meshStandardMaterial side={DoubleSide} />
			</mesh> */}

			{/** FrontWall */}
			{/* <mesh geometry={FrontWall.geometry} position={FrontWall.position}>
				<meshStandardMaterial map={frontWallTexture} side={DoubleSide} />
			</mesh> */}

			{/** WindowWall */}
			{/* <mesh geometry={WindowWall.geometry} position={WindowWall.position} /> */}

			<mesh geometry={Walls.geometry} position={Walls.position}>
				<meshStandardMaterial map={wallsTexture} attach="material" side={DoubleSide} />
			</mesh>

			{/** Roof */}
			<mesh geometry={Roof.geometry} position={Roof.position} material={roofMaterial} />

			{/** Floor */}
			<mesh geometry={Floor.geometry} position={Floor.position} material={floorMaterial} />
		</group>
	);
};

export default Foundation;
