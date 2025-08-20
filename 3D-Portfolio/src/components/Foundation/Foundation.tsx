import { Mesh, MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const foundationMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture(
	"Foundation",
	{
		diffuseT: "/baked-textures/Foundation/foundation_t1_color.png",
	},
	true
);

const Foundation: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Foundation = nodes["foundation_t1"] as Mesh;

	return (
		<group name={name}>
			{/** Foundation */}
			<mesh geometry={Foundation.geometry} position={Foundation.position} material={foundationMaterial} />
		</group>
	);
};

export default Foundation;
