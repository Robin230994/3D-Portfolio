import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { Color } from "three";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const coffeeCupHolderMaterial = materialCreator.createEmptyStandardMaterial("CupHolder");
coffeeCupHolderMaterial.color = new Color("#ffffff");
coffeeCupHolderMaterial.roughness = 0;
coffeeCupHolderMaterial.metalness = 0;
coffeeCupHolderMaterial.flatShading = true;

const CoffeeCupHolder: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry} position={object.position} rotation={object.rotation}>
			<meshStandardMaterial {...coffeeCupHolderMaterial} />
		</mesh>
	);
};

export default CoffeeCupHolder;
