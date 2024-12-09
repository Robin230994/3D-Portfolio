import { glassMaterial } from "../../Helper/GLMaterials";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const Window: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry} position={object.position}>
			<meshStandardMaterial {...glassMaterial} />
		</mesh>
	);
};

export default Window;
