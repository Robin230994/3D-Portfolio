import { MeshStandardMaterial } from "three";
import MaterialCreator from "../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

export const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("Floor", {
	diffuseT: "/baked-textures/Floor/floor_baked_color.jpg",
	roughnessT: "/baked-textures/Floor/floor_baked_roughness.jpg",
	normalT: "/baked-textures/Floor/floor_baked_normal.png",
});

export const frontWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("FrontWall", {
	diffuseT: "/baked-textures/Walls/Front/walls_color.webp",
	roughnessT: "/baked-textures/Walls/Front/walls_roughness.webp",
	normalT: "/baked-textures/Walls/Front/walls_normal.jpg",
});

export const backWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("BackWall", {
	diffuseT: "/baked-textures/Walls/Back/back_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Back/back_wall_roughness.jpwebpg",
	normalT: "/baked-textures/Walls/Back/back_wall_normal.png",
});

export const leftWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("LeftWall", {
	diffuseT: "/baked-textures/Walls/Left/left_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Left/left_wall_roughness.webp",
	normalT: "/baked-textures/Walls/Left/left_wall_normal.png",
});

export const windowWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("WindowWall", {
	diffuseT: "/baked-textures/Walls/Window/window_wall_color.webp",
	roughnessT: "/baked-textures/Walls/Window/window_wall_roughness.webp",
	normalT: "/baked-textures/Walls/Window/window_wall_normal.png",
});

export const roofMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("Roof", {
	diffuseT: "/baked-textures/Roof/roof_baked_color.jpg",
	roughnessT: "/baked-textures/Roof/roof_baked_roughness.jpg",
	normalT: "/baked-textures/Roof/roof_baked_normal.png",
});
