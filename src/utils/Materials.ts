import { Color, ColorManagement, DoubleSide, RepeatWrapping, Vector2, Vector3 } from "three";
import { extend } from "@react-three/fiber";

import MaterialCreator from "../classes/MaterialCreator";
import coffeeVertexShader from "./../shaders/CoffeeSmoke/vertex.glsl";
import coffeeFragmentShader from "./../shaders/CoffeeSmoke/fragment.glsl";
import mouseAreaFragmentShader from "./../shaders/MouseArea/fragment.glsl";
import mouseAreaVertexShader from "./../shaders/MouseArea/vertex.glsl";
import colorMixVertexShader from "./../shaders/MixColor/vertex.glsl";
import colorMixFragmentShader from "./../shaders/MixColor/fragment.glsl";
import worldRevealVertexShader from "./../shaders/WorldReveal/vertex.glsl";
import worldRevealFragmentShader from "./../shaders/WorldReveal/fragment.glsl";

ColorManagement.enabled = true;

const materialCreator = MaterialCreator.getInstance();

const glassMaterial = materialCreator.createEmptyPhysicalMaterial("Glass");
glassMaterial.color = new Color("#ffffff");
glassMaterial.transparent = true;
glassMaterial.transmission = 1;
glassMaterial.opacity = 1;
glassMaterial.roughness = 0.0;
glassMaterial.metalness = 0;
glassMaterial.thickness = 0.0;
glassMaterial.ior = 1.3;
glassMaterial.specularIntensity = 1;
glassMaterial.specularColor = new Color("#ffffff");
glassMaterial.envMapIntensity = 1;
glassMaterial.clearcoat = 1;
glassMaterial.clearcoatRoughness = 0;
glassMaterial.depthWrite = false;
glassMaterial.normalScale = new Vector2(1, -1);
glassMaterial.side = 2;
export { glassMaterial };

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
iot2Material.side = 2;
export { iot2Material };

const blackPlasticMaterial = materialCreator.createEmptyBasicMaterial("BlackPlastic");
blackPlasticMaterial.color = new Color("#000000");
blackPlasticMaterial.side = DoubleSide;
export { blackPlasticMaterial };

const metalMaterial = materialCreator.createEmptyStandardMaterial("Metal");
metalMaterial.color = new Color("#ffffff");
metalMaterial.roughness = 0.4;
metalMaterial.metalness = 0.65;
metalMaterial.envMapIntensity = 0.3;
export { metalMaterial };

const foundationMaterial = materialCreator.createStandardMaterialFromTexture("Foundation", {
	diffuseT: "/baked-textures/Foundation/foundation_t1_color.jpg",
	normalT: "/baked-textures/Foundation/foundation_t1_normal.png",
	roughnessT: "/baked-textures/Foundation/foundation_t1_roughness.jpg",
	lightMapT: "/baked-textures/Foundation/lightmap.png",
});
// foundationMaterial.toneMapped = false;
// foundationMaterial.emissiveIntensity = 1.2;
export { foundationMaterial };

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
	coffeeVertexShader,
	coffeeFragmentShader,
);
extend({ CoffeeSmokeMaterial });
export { CoffeeSmokeMaterial };

const MouseAreaShaderMaterial = materialCreator.createShaderMaterial(
	"MouseAreaMaterial",
	{
		uLeft: 0,
		uRight: 0,
		uTop: 0,
		uBottom: 0,
		uMousePosition: new Vector2(0.5, 0.5),
		uColor: new Color("#ff0000"),
		uEdgeWidth: 0.05,
	},
	mouseAreaVertexShader,
	mouseAreaFragmentShader,
);
extend({ MouseAreaShaderMaterial });
export { MouseAreaShaderMaterial };

const MixColorShaderMaterial = materialCreator.createShaderMaterial(
	"MixColor",
	{
		uColorOne: new Color(),
		uColorTwo: new Color(),
		uProgress: 0,
		uAspect: 1,
		uTime: 0,
	},
	colorMixVertexShader,
	colorMixFragmentShader,
);
extend({ MixColorShaderMaterial });
export { MixColorShaderMaterial };

const WorldRevealShaderMaterial = materialCreator.createShaderMaterial(
	"WorldRevealMaterial",
	{
		uRevealCenter: new Vector3(0.008, 1.06, -0.135),
		uRadius: 0,
		uSoftness: 0.5,
	},
	worldRevealVertexShader,
	worldRevealFragmentShader,
);
extend({ WorldRevealShaderMaterial });
export { WorldRevealShaderMaterial };
