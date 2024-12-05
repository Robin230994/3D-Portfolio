import { Material, Mesh, MeshBasicMaterial, MeshStandardMaterial, Texture } from "three";
import { IUIComponentProps } from "../../interfaces/GLlnterfaces";
import { forwardRef } from "react";

interface CustomMeshUIProps extends IUIComponentProps {
	props: {
		data: { objectName: string; object: Mesh; material?: Material };
		functions: object;
		refs: object;
	};
}

// Define the component using forwardRef
const CustomMeshUI = forwardRef<Mesh, CustomMeshUIProps>(({ props }, ref) => {
	const { data } = props;

	// Render the correct material component based on the material type
	const renderMaterial = () => {
		if (data.material instanceof MeshStandardMaterial) {
			// Ensure the map texture is flipped
			if (data.material.map instanceof Texture) {
				data.material.map.flipY = false; // Flip the texture along Y-axis
				data.material.map.needsUpdate = true; // Notify Three.js of the change
			}
			return <meshStandardMaterial {...data.material} />;
		}

		if (data.material instanceof MeshBasicMaterial) {
			return <meshBasicMaterial {...data.material} />;
		}

		// Add other material types as needed
		return null; // Default to no material if type is unknown
	};

	return (
		<mesh ref={ref} name={data.objectName} geometry={data.object.geometry}>
			{renderMaterial()}
		</mesh>
	);
});

export default CustomMeshUI;
