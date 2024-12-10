import { MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const filingMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Filing", {
	diffuseT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_BaseColor.jpg",
	displacementT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Displacement.jpg",
	metallnessT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Metallic.jpg",
	normalT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Normal.jpg",
	aoT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_AmbientOcclusion.jpg",
});

const Filling: React.FC<CustomMeshProps> = ({ name, object }) => {
	return (
		<mesh name={name} geometry={object.geometry} position={object.position} receiveShadow>
			<meshStandardMaterial {...filingMaterial} />
		</mesh>
	);
};

export default Filling;
