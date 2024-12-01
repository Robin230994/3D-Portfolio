import { Mesh } from "three";
import { IUIComponentProps } from "../../interfaces/GLlnterfaces";

interface CustomMeshUIProps extends IUIComponentProps {
	props: {
		data: { objectName: string; object: Mesh };
		functions: object;
		refs: object;
	};
}

const CustomMeshUI: React.FC<CustomMeshUIProps> = ({ props }) => {
	const { data } = props;
	return (
		<mesh name={data.objectName} geometry={data.object.geometry}>
			<meshStandardMaterial color={"blue"} />
		</mesh>
	);
};

export default CustomMeshUI;
