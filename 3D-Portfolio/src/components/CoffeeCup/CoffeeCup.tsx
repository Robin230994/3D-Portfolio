import { Texture } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const cupDiffuseTexture = materialCreator.loadTexture("/baked-textures/Cup/Tasse-Textur.jpg") as Texture;
cupDiffuseTexture.flipY = false;

const cupMaterial = materialCreator.createStandardMaterialFromTexture("Cup", { diffuseT: cupDiffuseTexture });
cupMaterial.roughness = 0;
cupMaterial.metalness = 0;
cupMaterial.flatShading = true;

const CoffeeCup: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry} position={object.position} rotation={object.rotation} receiveShadow castShadow>
			<meshStandardMaterial {...cupMaterial} />
		</mesh>
	);
};

export default CoffeeCup;
