import { Color, Mesh, MeshLambertMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { deskMaterial } from "../../Helper/GLMaterials";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const lampEmissionMaterial: MeshLambertMaterial = materialCreator.createEmptyLambertMaterial("LampEmission");
lampEmissionMaterial.color = new Color("#fefefe");
lampEmissionMaterial.emissive = new Color("#fefefe");
lampEmissionMaterial.emissiveIntensity = 1.2;

const RoofLamp: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const RoofLamp: Mesh = nodes["RoofLamp"] as Mesh;
	const RoofLampEmission: Mesh = nodes["RoofLampEmission"] as Mesh;

	return (
		<>
			{/* <EffectComposer>
				<Bloom mipmapBlur luminanceThreshold={1.2} />
			</EffectComposer> */}
			<group name={name}>
				<mesh geometry={RoofLamp.geometry} position={RoofLamp.position} rotation={RoofLamp.rotation} material={deskMaterial} />
				<mesh geometry={RoofLampEmission.geometry} position={RoofLampEmission.position} rotation={RoofLampEmission.rotation} material={lampEmissionMaterial} />
			</group>
		</>
	);
};

export default RoofLamp;
