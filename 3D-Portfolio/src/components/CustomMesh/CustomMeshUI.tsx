import { IUIComponentProps } from "../../interfaces/gllnterfaces";

import * as THREE from "three";

interface CustomMeshUIProps extends IUIComponentProps {
	props: {
		data: { objectName: string; object: THREE.Mesh };
		functions: object;
		refs: object;
	};
}

const CustomMeshUI: React.FC<CustomMeshUIProps> = ({ props }) => {
	const { data } = props;
	return (
		<mesh name={data.objectName} geometry={data.object.geometry}>
			<meshBasicMaterial color={"blue"} />
		</mesh>
	);
};

export default CustomMeshUI;
