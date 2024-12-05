import { Material, Mesh } from "three";
import CustomMeshUI from "./CustomMeshUI";

interface CustomMeshProps {
	objectName: string;
	object: Mesh;
	material?: Material;
}

const CustomMesh: React.FC<CustomMeshProps> = ({ objectName, object, material }): JSX.Element | null => {
	console.log(material);
	if (!object) {
		console.error(`Unable to load unknown mesh with name "${objectName}"`);
		return null;
	}

	const customMeshUIProps = {
		data: { objectName, object, material },
		functions: {},
		refs: {},
	};

	return <CustomMeshUI props={customMeshUIProps} />;
};

export default CustomMesh;
