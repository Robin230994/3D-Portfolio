import { MeshPhongMaterial, Vector2 } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useControls } from "leva";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const filingMaterial: MeshPhongMaterial = materialCreator.createPhongMaterialFromTexture("Filing", {
	diffuseT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_BaseColor.jpg",
	displacementT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Displacement.jpg",
	normalT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Normal.jpg",
	aoT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_AmbientOcclusion.jpg",
});

const Filing: React.FC<CustomMeshProps> = ({ name, object }) => {
	const filingParams = useControls(
		"Filing",
		{
			aoMapIntensity: { value: 0, min: 0, max: 1, step: 0.1 },
			displacementScale: { value: 0, min: 0, max: 1, step: 0.1 },
			displacementBias: { value: 0, min: 0, max: 1, step: 0.1 },
			normalScale: { value: { x: 0, y: 0 }, min: 0, max: 1, step: 0.1 },
			reflectivity: { value: 0.5, min: 0, max: 1, step: 0.1 },
			shininess: { value: 30, min: 0, max: 50, step: 1 },
			flatShading: false,
		},
		{ collapsed: true }
	);

	return (
		<mesh name={name} geometry={object.geometry} position={object.position} receiveShadow>
			<meshPhongMaterial
				{...filingMaterial}
				aoMapIntensity={filingParams.aoMapIntensity}
				displacementScale={filingParams.displacementScale}
				displacementBias={filingParams.displacementBias}
				normalScale={new Vector2(filingParams.normalScale.x, filingParams.normalScale.y)}
				reflectivity={filingParams.reflectivity}
				shininess={filingParams.shininess}
				flatShading={filingParams.flatShading}
			/>
		</mesh>
	);
};

export default Filing;
