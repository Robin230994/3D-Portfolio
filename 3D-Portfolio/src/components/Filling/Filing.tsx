import { Color, Mesh, MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useControls } from "leva";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const filingMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Filing", {
	diffuseT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_BaseColor.jpg",
	roughnessT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_Roughness.jpg",
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
	const Vase: Mesh = nodes["vase"] as Mesh;
	const Flower1: Mesh = nodes["Flower1"] as Mesh;
	const Flower2: Mesh = nodes["Flower2"] as Mesh;
	const Flower3: Mesh = nodes["Flower3"] as Mesh;
	const Flower4: Mesh = nodes["Flower4"] as Mesh;

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

	const vaseParams = useControls(
		"Vase",
		{
			position: { value: { x: 7.6, y: 1.45, z: 0.87 }, step: 0.01 },
			flower1Position: { value: { x: 7.5, y: 1.87, z: 0.86 }, step: 0.01 },
			flower1Rotation: { value: { x: 0, y: -45, z: 0 }, step: 1 },
			flower2Position: { value: { x: 7.6, y: 1.87, z: 0.66 }, step: 0.01 },
			flower3Position: { value: { x: 7.46, y: 1.87, z: 0.97 }, step: 0.01 },
			flower3Rotation: { value: { x: 0, y: 128, z: 0 }, step: 10 },
			flower4Position: { value: { x: 7.68, y: 1.87, z: 0.83 }, step: 0.01 },
			flower4Rotation: { value: { x: 0, y: 90, z: 0 }, step: 10 },
		},
		{ collapsed: true }
	);

	return (
		<group name={name}>
			{/** Filing base */}
			<mesh geometry={Filing.geometry} position={Filing.position} receiveShadow>
				<meshStandardMaterial {...filingMaterial} />
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

			{/** Vase + Flowers */}
			<group name="Vase">
				{/** Vase */}
				<mesh geometry={Vase.geometry} position={[vaseParams.position.x, vaseParams.position.y, vaseParams.position.z]}>
					<meshStandardMaterial />
				</mesh>

				{/** Flower 1 */}
				<mesh
					geometry={Flower1.geometry}
					position={[vaseParams.flower1Position.x, vaseParams.flower1Position.y, vaseParams.flower1Position.z]}
					rotation={[vaseParams.flower1Rotation.x, vaseParams.flower1Rotation.y, vaseParams.flower1Rotation.z]}>
					<meshStandardMaterial />
				</mesh>

				{/** Flower 2*/}
				<mesh geometry={Flower2.geometry} position={[vaseParams.flower2Position.x, vaseParams.flower2Position.y, vaseParams.flower2Position.z]}>
					<meshStandardMaterial />
				</mesh>

				{/** Flower 3*/}
				<mesh
					geometry={Flower3.geometry}
					position={[vaseParams.flower3Position.x, vaseParams.flower3Position.y, vaseParams.flower3Position.z]}
					rotation={[vaseParams.flower3Rotation.x, vaseParams.flower3Rotation.y, vaseParams.flower3Rotation.z]}>
					<meshStandardMaterial />
				</mesh>

				{/** Flower 4*/}
				<mesh
					geometry={Flower4.geometry}
					position={[vaseParams.flower4Position.x, vaseParams.flower4Position.y, vaseParams.flower4Position.z]}
					rotation={[vaseParams.flower4Rotation.x, vaseParams.flower4Rotation.y, vaseParams.flower4Rotation.z]}>
					<meshStandardMaterial />
				</mesh>
			</group>
		</group>
	);
};

export default Filing;
