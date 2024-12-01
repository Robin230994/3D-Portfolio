import { Mesh } from "three";
import CustomMeshUI from "./CustomMeshUI";

interface CustomMeshProps {
	objectName: string;
	object: Mesh;
}

const CustomMesh: React.FC<CustomMeshProps> = ({ objectName, object }): JSX.Element | null => {
	if (!object) {
		console.error(`Unable to load unknown mesh with name "${objectName}"`);
		return null;
	}

	const customMeshUIProps = {
		data: { objectName, object },
		functions: {},
		refs: {},
	};

	return <CustomMeshUI props={customMeshUIProps} />;
};

export default CustomMesh;
