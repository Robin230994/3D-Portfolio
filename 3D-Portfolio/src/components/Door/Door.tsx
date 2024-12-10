import { DoubleSide } from "three";
import MaterialCreator from "../../classes/MaterialCreator";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const materialCreator = MaterialCreator.getInstance();

// const doorMaterial = materialCreator.createStandardMaterialFromTexture("DoorBase", {
//     diffuseT: "/baked-textures/"
// })

const Door: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry} position={object.position} rotation={object.rotation}>
			<meshStandardMaterial color={"#7d5030"} side={DoubleSide} />
		</mesh>
	);
};

export default Door;
