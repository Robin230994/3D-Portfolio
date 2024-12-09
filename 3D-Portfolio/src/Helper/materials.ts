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
	roughnessT: "/baked-textures/Walls/Back/back_wall_roughness.webp",
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

export const filingMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("Filing", {
	diffuseT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_BaseColor.jpg",
	roughnessT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Roughness.jpg",
	displacementT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Displacement.jpg",
	metallnessT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Metallic.jpg",
	normalT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Normal.jpg",
	aoT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_AmbientOcclusion.jpg",
});

export const cupMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("Cup", {
	diffuseT: "/baked-textures/Cup/Tasse-Textur.jpg",
});

export const glassMaterial: MeshStandardMaterial = new MeshStandardMaterial({ color: "#ffffff", roughness: 0, metalness: 0, opacity: 0.3, transparent: true });
