import { MeshStandardMaterial } from "three";
import MaterialCreator from "../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

export const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("Floor", {
	diffuseT: "/baked-textures/Floor/floor_baked_color.jpg",
	roughnessT: "/baked-textures/Floor/floor_baked_roughness.jpg",
	normalT: "/baked-textures/Floor/floor_baked_normal.png",
});

export const frontWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("FrontWall", {
	diffuseT: "/baked-textures/Walls/Front/walls_color.jpg",
	roughnessT: "/baked-textures/Walls/Front/walls_roughness.jpg",
	normalT: "/baked-textures/Walls/Front/walls_normal.jpg",
});

export const backWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("BackWall", {
	diffuseT: "/baked-textures/Walls/Back/back_wall_color.jpg",
});

export const leftWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("LeftWall", {
	diffuseT: "/baked-textures/Walls/Left/left_wall_color.jpg",
	roughnessT: "/baked-textures/Walls/Left/left_wall_roughness.jpg",
	normalT: "/baked-textures/Walls/Left/left_wall_normal.png",
});

export const windowWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("WindowWall", {
	diffuseT: "/baked-textures/Walls/Window/window_wall_color.jpg",
	roughnessT: "/baked-textures/Walls/Window/window_wall_roughness.jpg",
	normalT: "/baked-textures/Walls/Window/window_wall_normal.png",
});
