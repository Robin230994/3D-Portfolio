import { Color, Mesh, MeshLambertMaterial, SpotLight, SpotLightHelper } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { brownPlasticMaterial, deskMaterial } from "../../Helper/GLMaterials";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { MutableRefObject, useRef } from "react";

import MaterialCreator from "../../classes/MaterialCreator";
import { useHelper } from "@react-three/drei";
import { useControls } from "leva";

const materialCreator = MaterialCreator.getInstance();

const lampEmissionMaterial: MeshLambertMaterial = materialCreator.createEmptyLambertMaterial("LampEmission");
lampEmissionMaterial.color = new Color("#fefefe");
lampEmissionMaterial.emissive = new Color("#fefefe");
lampEmissionMaterial.emissiveIntensity = 1;

const RoofLamp: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const RoofLamp: Mesh = nodes["RoofLamp"] as Mesh;
	const RoofLampEmission: Mesh = nodes["RoofLampEmission"] as Mesh;

	return (
		<>
			{/* <EffectComposer>
				<Bloom mipmapBlur luminanceThreshold={1.1} />
			</EffectComposer> */}
			<group name={name}>
				<mesh geometry={RoofLamp.geometry} position={RoofLamp.position} rotation={RoofLamp.rotation} material={brownPlasticMaterial} />
				<mesh geometry={RoofLampEmission.geometry} position={RoofLampEmission.position} rotation={RoofLampEmission.rotation} material={lampEmissionMaterial} />
			</group>
		</>
	);
};

export default RoofLamp;
