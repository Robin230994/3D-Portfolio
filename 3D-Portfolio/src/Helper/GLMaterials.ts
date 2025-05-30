import { Color, ColorManagement, DoubleSide, RepeatWrapping, Vector2 } from "three";

import MaterialCreator from "../classes/MaterialCreator";
import vertexShader from "./../shaders/vertex.glsl";
import fragmentShader from "./../shaders/fragment.glsl";
import { extend } from "@react-three/fiber";

ColorManagement.enabled = true;

const materialCreator = MaterialCreator.getInstance();

const glassMaterial = materialCreator.createEmptyStandardMaterial("Glass");
glassMaterial.color = new Color("#ffffff");
glassMaterial.roughness = 0;
glassMaterial.metalness = 0;
glassMaterial.opacity = 0.3;
glassMaterial.transparent = true;
glassMaterial.normalScale = new Vector2(1, -1);
export { glassMaterial };

const deskMaterial = materialCreator.createStandardMaterialFromTexture("Desk", {
	diffuseT: "/baked-textures/Desk/desks_color_lighting_baked.jpg",
});
export { deskMaterial };

const blackPlasticMaterial = materialCreator.createEmptyBasicMaterial("BlackPlastic");
blackPlasticMaterial.color = new Color("#000000");
blackPlasticMaterial.side = DoubleSide;
export { blackPlasticMaterial };

const brownPlasticMaterial = materialCreator.createEmptyPhongMaterial("BrownPlastic");
brownPlasticMaterial.color = new Color("#8b7f7e");
brownPlasticMaterial.side = DoubleSide;
brownPlasticMaterial.shininess = 100;
export { brownPlasticMaterial };

const metalMaterial = materialCreator.createEmptyStandardMaterial("Metal");
metalMaterial.color = new Color("#ffffff");
metalMaterial.roughness = 0;
metalMaterial.metalness = 1;
export { metalMaterial };

const goldMetalMaterial = materialCreator.createEmptyStandardMaterial("GoldMetal");
goldMetalMaterial.color = new Color("#D4AF37");
goldMetalMaterial.roughness = 0;
goldMetalMaterial.metalness = 1;
export { goldMetalMaterial };

const cupboardDoorMaterial = materialCreator.createEmptyStandardMaterial("CupboardDoors");
cupboardDoorMaterial.color = new Color("#3F3F3F");
cupboardDoorMaterial.roughness = 0.0;
export { cupboardDoorMaterial };

const perlinNoiseCoffeeTexture = materialCreator.loadTexture("./baked-textures/Filling/perlin-noise-coffee.png", (loadedTexture) => {
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
