import { Color } from "three";
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

export { deskMaterial };
