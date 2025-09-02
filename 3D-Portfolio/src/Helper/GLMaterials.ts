import { Color, ColorManagement, DoubleSide, RepeatWrapping, Vector2 } from "three";

import MaterialCreator from "../classes/MaterialCreator";
import vertexShader from "./../shaders/vertex.glsl";
import fragmentShader from "./../shaders/fragment.glsl";
import { extend } from "@react-three/fiber";

ColorManagement.enabled = true;

const materialCreator = MaterialCreator.getInstance();

const glassMaterial = materialCreator.createEmptyPhysicalMaterial("Glass");
glassMaterial.color = new Color("#ffffff");
glassMaterial.transparent = true;
glassMaterial.transmission = 1;
glassMaterial.opacity = 1;
glassMaterial.roughness = 0;
glassMaterial.metalness = 0;
glassMaterial.thickness = 0.2;
glassMaterial.ior = 1.5;
glassMaterial.specularIntensity = 1;
glassMaterial.specularColor = new Color("#ffffff");
glassMaterial.envMapIntensity = 1;
glassMaterial.clearcoat = 1;
glassMaterial.clearcoatRoughness = 0;

glassMaterial.normalScale = new Vector2(1, -1);
export { glassMaterial };

const deskMaterial = materialCreator.createStandardMaterialFromTexture("Desk", {
	diffuseT: "/baked-textures/Desk/desks_color_lighting_baked.jpg",
});
export { deskMaterial };

const iot1Material = materialCreator.createStandardMaterialFromTexture("iot1Material", {
	diffuseT: "/baked-textures/Objects/TI1/objects_ti1_color.jpg",
	roughnessT: "/baked-textures/Objects/TI1/objects_ti1_roughness.jpg",
});
iot1Material.transparent = true;
iot1Material.side = DoubleSide;
export { iot1Material };

const iot2Material = materialCreator.createStandardMaterialFromTexture("iot2Material", {
	diffuseT: "/baked-textures/Objects/TI2/objects_ti2_color.png",
	roughnessT: "/baked-textures/Objects/TI2/objects_ti2_roughness.jpg",
});
export { iot2Material };

const blackPlasticMaterial = materialCreator.createEmptyBasicMaterial("BlackPlastic");
blackPlasticMaterial.color = new Color("#000000");
blackPlasticMaterial.side = DoubleSide;
export { blackPlasticMaterial };

const metalMaterial = materialCreator.createEmptyStandardMaterial("Metal");
metalMaterial.color = new Color("#ffffff");
metalMaterial.roughness = 0;
metalMaterial.metalness = 1;
export { metalMaterial };

const perlinNoiseCoffeeTexture = materialCreator.loadTexture("./baked-textures/Objects/TI1/perlin-noise-texture.png", (loadedTexture) => {
	loadedTexture.wrapS = RepeatWrapping;
	loadedTexture.wrapT = RepeatWrapping;
	loadedTexture.needsUpdate = true;
});

const CoffeeSmokeMaterial = materialCreator.createShaderMaterial(
	"CoffeeSmoke",
	{
		uTime: 0,
		uPerlinTexture: perlinNoiseCoffeeTexture,
	},
	vertexShader,
	fragmentShader
);
extend({ CoffeeSmokeMaterial });
export { CoffeeSmokeMaterial };
