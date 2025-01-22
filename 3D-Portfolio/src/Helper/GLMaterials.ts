import { Color, ColorManagement, DoubleSide, Vector2 } from "three";
import MaterialCreator from "../classes/MaterialCreator";

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

const deskMaterial = materialCreator.createEmptyStandardMaterial("Desk");
deskMaterial.roughness = 0.75;
deskMaterial.metalness = 0;
deskMaterial.color = new Color("#b4b9b2");
deskMaterial.side = DoubleSide;
export { deskMaterial };

const blackPlasticMaterial = materialCreator.createEmptyBasicMaterial("BlackPlastic");
blackPlasticMaterial.color = new Color("#000000");
blackPlasticMaterial.side = DoubleSide;
export { blackPlasticMaterial };

const bluePlasticMaterial = materialCreator.createEmptyPhongMaterial("BluePlastic");
bluePlasticMaterial.color = new Color("#AEC5CF");
bluePlasticMaterial.side = DoubleSide;
bluePlasticMaterial.shininess = 100;
export { bluePlasticMaterial };

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
