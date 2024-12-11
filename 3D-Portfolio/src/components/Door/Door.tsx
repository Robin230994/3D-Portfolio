import { DoubleSide } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

// const materialCreator = MaterialCreator.getInstance();

// const doorMaterial = materialCreator.createStandardMaterialFromTexture("DoorBase", {
//     diffuseT: "/baked-textures/"
// })

const Door: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		/** Main Door */
		<mesh name={name} geometry={object.geometry} position={object.position} rotation={object.rotation}>
			<meshStandardMaterial color={"#7d5030"} side={DoubleSide} />
		</mesh>
	);
};

export default Door;
