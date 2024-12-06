import { MeshStandardMaterial } from "three";
import MaterialCreator from "../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

export const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("FloorMat", {
	diffuseT: "/baked-textures/Floor/floor_baked_color.jpg",
	roughnessT: "/baked-textures/Floor/floor_baked_roughness.jpg",
	normalT: "/baked-textures/Floor/floor_baked_normal.png",
});

export const frontWallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("FrontWallMat", {
	diffuseT: "/baked-textures/Walls/Front/walls_color.jpg",
	roughnessT: "/baked-textures/Walls/Front/walls_roughness.jpg",
	normalT: "/baked-textures/Walls/Front/walls_normal.jpg",
});
