import { Material, Mesh } from "three";
import { IUIComponentProps } from "../../interfaces/GLlnterfaces";

interface CustomMeshUIProps extends IUIComponentProps {
	props: {
		data: { objectName: string; object: Mesh; material?: Material };
		functions: object;
		refs: object;
	};
}

const CustomMeshUI: React.FC<CustomMeshUIProps> = ({ props }) => {
	const { data } = props;
	return <mesh name={data.objectName} geometry={data.object.geometry} material={data.material}></mesh>;
};

export default CustomMeshUI;
