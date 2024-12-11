import { Color, Mesh, MeshPhongMaterial, Vector2 } from "three";
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

const cupMaterial = materialCreator.createStandardMaterialFromTexture("Cup", { diffuseT: "/baked-textures/Cup/Tasse-Textur.jpg" });
cupMaterial.roughness = 0;
cupMaterial.metalness = 0;
cupMaterial.flatShading = true;

const coffeeCupHolderMaterial = materialCreator.createEmptyStandardMaterial("CupHolder");
coffeeCupHolderMaterial.color = new Color("#ffffff");
coffeeCupHolderMaterial.roughness = 0;
coffeeCupHolderMaterial.metalness = 0;
coffeeCupHolderMaterial.flatShading = true;

const coffeeCupStandMaterial = materialCreator.createEmptyStandardMaterial("CupStand");

const Filing: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Filing: Mesh = nodes["Filing"] as Mesh;
	const CoffeeCup: Mesh = nodes["Cup"] as Mesh;
	const CoffeeCupHolder: Mesh = nodes["CupHolder"] as Mesh;
	const CoffeeCupStand: Mesh = nodes["CoffeCupStand"] as Mesh;

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

	const coffeeCupStandParams = useControls(
		"CoffeeCupStand",
		{
			roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
			metalness: { value: 1, min: 0, max: 1, step: 0.1 },
			color: "#ffffff",
		},
		{ collapsed: true }
	);

	return (
		<group name={name}>
			{/** Filing base */}
			<mesh geometry={Filing.geometry} position={Filing.position} receiveShadow>
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

			{/** Coffee cup + Cofee holder + Cofee stand */}
			<group name="CoffeeCup">
				{/** Coffee Cup */}
				<mesh geometry={CoffeeCup.geometry} position={CoffeeCup.position} rotation={CoffeeCup.rotation}>
					<meshStandardMaterial {...cupMaterial} />
				</mesh>

				{/** Coffee Cup Holder */}
				<mesh geometry={CoffeeCupHolder.geometry} position={CoffeeCupHolder.position} rotation={CoffeeCupHolder.rotation}>
					<meshStandardMaterial {...coffeeCupHolderMaterial} />
				</mesh>

				{/** Coffee Cup Stand */}
				<mesh geometry={CoffeeCupStand.geometry} position={CoffeeCupStand.position} rotation={CoffeeCupStand.rotation}>
					<meshStandardMaterial {...coffeeCupStandMaterial} />
				</mesh>
			</group>
		</group>
	);
};

export default Filing;
