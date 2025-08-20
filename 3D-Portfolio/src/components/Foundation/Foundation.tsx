import { Mesh, MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { glassMaterial } from "../../Helper/GLMaterials";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const foundationMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Foundation", {
	diffuseT: "/baked-textures/Foundation/foundation_t1_color.png",
});

const Foundation: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Foundation = nodes["foundation_t1"] as Mesh;
	const Window = nodes["Window"] as Mesh;

	return (
		<group name={name}>
			{/** Foundation */}
			<mesh geometry={Foundation.geometry} position={Foundation.position} material={foundationMaterial} scale={Foundation.scale} />

			{/** Window */}
			<mesh geometry={Window.geometry} position={Window.position} rotation={Window.rotation} scale={Window.scale} material={glassMaterial} />
		</group>
	);
};

export default Foundation;
