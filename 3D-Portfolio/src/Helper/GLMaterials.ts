import { Color, DoubleSide, MeshPhongMaterial } from "three";
import MaterialCreator from "../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const glassMaterial = materialCreator.createEmptyStandardMaterial("Glass");
glassMaterial.color = new Color("#ffffff");
glassMaterial.roughness = 0;
glassMaterial.metalness = 0;
glassMaterial.opacity = 0;
glassMaterial.transparent = true;
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

const greenPlasticMaterial = materialCreator.createEmptyPhongMaterial("GreenPlastic");
greenPlasticMaterial.color = new Color("#3C857D");
greenPlasticMaterial.side = DoubleSide;
greenPlasticMaterial.shininess = 100;
export { greenPlasticMaterial };

const metalMaterial = materialCreator.createEmptyStandardMaterial("Metal");
metalMaterial.color = new Color("#ffffff");
metalMaterial.roughness = 0;
metalMaterial.metalness = 1;
export { metalMaterial };

const cupboardDoorMaterial = materialCreator.createEmptyStandardMaterial("CupboardDoors");
cupboardDoorMaterial.color = new Color("#3F3F3F");
cupboardDoorMaterial.roughness = 0.0;
export { cupboardDoorMaterial };
