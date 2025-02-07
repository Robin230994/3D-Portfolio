import { CircleGeometry, Color, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, ShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { folder, useControls } from "leva";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

/** Materials */

const filingMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Filing", {
	diffuseT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_BaseColor.webp",
	aoT: "/baked-textures/Filling/Poliigon_StoneQuartzite_8060_AmbientOcclusion.webp",
});
filingMaterial.roughness = 0;

/** Cup material */

const cupMaterial = materialCreator.createStandardMaterialFromTexture("Cup", { diffuseT: "/baked-textures/Cup/Tasse-Textur.jpg" });
cupMaterial.roughness = 0.09;
cupMaterial.metalness = 0;
cupMaterial.flatShading = false;

/** Cup holder material */

const coffeeCupHolderMaterial = materialCreator.createEmptyStandardMaterial("CupHolder");
coffeeCupHolderMaterial.color = new Color("#ffffff");
coffeeCupHolderMaterial.roughness = 0.09;
coffeeCupHolderMaterial.metalness = 0;
coffeeCupHolderMaterial.flatShading = false;

/** Cup stand material */

const coffeeCupStandMaterial = materialCreator.createEmptyStandardMaterial("CupStand");
coffeeCupStandMaterial.metalness = 1;
coffeeCupStandMaterial.roughness = 0.2;
coffeeCupStandMaterial.color = new Color("#bbbbbb");

/** Vase material */

const vaseMaterial = materialCreator.createEmptyStandardMaterial("Vase");
vaseMaterial.roughness = 0;
vaseMaterial.color = new Color("#266972");

/** Flower material */

const flowerMaterial = materialCreator.createEmptyStandardMaterial("Flower");
flowerMaterial.color = new Color("#ba8c4f");

const coffeeMaterial = materialCreator.createStandardMaterialFromTexture("Coffee", {
	diffuseT: "/baked-textures/Filling/coffee-texture.jpg",
});

const Filing: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Filing: Mesh = nodes["Filing"] as Mesh;
	const CoffeeCup: Mesh = nodes["Cup"] as Mesh;
	const CoffeeCupHolder: Mesh = nodes["CupHolder"] as Mesh;
	const CoffeeCupStand: Mesh = nodes["CoffeCupStand"] as Mesh;
	const Vase: Mesh = nodes["vase"] as Mesh;
	const Flower1: Mesh = nodes["Flower1"] as Mesh;
	const Flower2: Mesh = nodes["Flower2"] as Mesh;

	const coffeeSmokeMatRef = useRef<ShaderMaterial | null>(null);

	const filingParams = useControls(
		"Filing",
		{
			Base: folder(
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
			),
			Cup: folder(
				{
					cupRoughness: { value: 0.09, min: 0, max: 1, step: 0.01 },
					holderScale: { value: { x: 1, y: 3.5, z: 1 }, step: 0.01 },
				},
				{ collapsed: true } // Optional, to collapse the folder
			),

			Vase: folder(
				{
					vaseColor: "#266972",
					vaseRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
					vasePosition: { value: { x: 7.6, y: 1.45, z: 0.87 }, step: 0.01 },
					Flowers: folder({
						flowerColor: "#ba8c4f",
						flower1Position: { value: { x: 7.5, y: 1.87, z: 0.86 }, step: 0.01 },
						flower1Rotation: { value: { x: 0, y: -45, z: 0 }, step: 1 },
						flower2Position: { value: { x: 7.6, y: 1.87, z: 0.66 }, step: 0.01 },
						flower3Position: { value: { x: 7.46, y: 1.87, z: 0.97 }, step: 0.01 },
						flower3Rotation: { value: { x: 0, y: 128, z: 0 }, step: 10 },
						flower4Position: { value: { x: 7.68, y: 1.87, z: 0.83 }, step: 0.01 },
						flower4Rotation: { value: { x: 0, y: 90, z: 0 }, step: 10 },
					}),
				},
				{ collapsed: true }
			),
		},
		{ collapsed: true }
	);

	useFrame((state) => {
		const { clock } = state;
		if (coffeeSmokeMatRef.current) {
			coffeeSmokeMatRef.current.uniforms.uTime.value = clock.getElapsedTime();
		}
	});

	return (
		<group name={name}>
			{/** Filing base */}
			<mesh geometry={Filing.geometry} position={Filing.position} receiveShadow material={filingMaterial} />

			{/** Coffee cup + Cofee holder + Cofee stand */}
			<group name="CoffeeCup">
				{/** Coffee Cup */}
				<mesh geometry={CoffeeCup.geometry} position={CoffeeCup.position} rotation={CoffeeCup.rotation} material={cupMaterial} />

				{/** Coffee texture */}
				<mesh geometry={new CircleGeometry(10, 32)} position={[7.53, 1.4, -0.86]} rotation={[-Math.PI / 2, 0, 0]} scale={0.0065} material={coffeeMaterial} />

				{/** Coffee smoke */}
				<mesh geometry={new PlaneGeometry(1, 1, 16, 64)} position={[7.53, 1.53, -0.86]} rotation={[0, Math.PI / 2, 0]} scale={[0.09, 0.2, 0.09]}>
					<coffeeSmokeMaterial ref={coffeeSmokeMatRef} side={DoubleSide} transparent />
				</mesh>

				{/** Coffee Cup Holder */}
				<mesh
					geometry={CoffeeCupHolder.geometry}
					position={CoffeeCupHolder.position}
					rotation={CoffeeCupHolder.rotation}
					scale={[filingParams.holderScale.x, filingParams.holderScale.y, filingParams.holderScale.z]}
					material={coffeeCupHolderMaterial}
				/>

				{/** Coffee Cup Stand */}
				<mesh geometry={CoffeeCupStand.geometry} position={CoffeeCupStand.position} rotation={CoffeeCupStand.rotation} material={coffeeCupStandMaterial} />
			</group>

			{/** Vase + Flowers */}
			<group name="Vase">
				{/** Vase */}
				<mesh
					geometry={Vase.geometry}
					position={[filingParams.vasePosition.x, filingParams.vasePosition.y, filingParams.vasePosition.z]}
					material={vaseMaterial}
				/>

				{/** Flower 1 */}
				<mesh
					geometry={Flower1.geometry}
					position={[filingParams.flower1Position.x, filingParams.flower1Position.y, filingParams.flower1Position.z]}
					rotation={[filingParams.flower1Rotation.x, filingParams.flower1Rotation.y, filingParams.flower1Rotation.z]}
					material={flowerMaterial}
				/>

				{/** Flower 2*/}
				<mesh
					geometry={Flower2.geometry}
					position={[filingParams.flower2Position.x, filingParams.flower2Position.y, filingParams.flower2Position.z]}
					material={flowerMaterial}
				/>

				{/** Flower 3*/}
				<mesh
					geometry={Flower2.geometry}
					position={[filingParams.flower3Position.x, filingParams.flower3Position.y, filingParams.flower3Position.z]}
					rotation={[filingParams.flower3Rotation.x, filingParams.flower3Rotation.y, filingParams.flower3Rotation.z]}
					material={flowerMaterial}
				/>

				{/** Flower 4*/}
				<mesh
					geometry={Flower1.geometry}
					position={[filingParams.flower4Position.x, filingParams.flower4Position.y, filingParams.flower4Position.z]}
					rotation={[filingParams.flower4Rotation.x, filingParams.flower4Rotation.y, filingParams.flower4Rotation.z]}
					material={flowerMaterial}
				/>
			</group>
		</group>
	);
};

export default Filing;
