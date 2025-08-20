import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, DoubleSide, Mesh } from "three";
import { blackPlasticMaterial } from "../../../Helper/GLMaterials";
import MaterialCreator from "../../../classes/MaterialCreator";
import { useControls } from "leva";

const materialCreator = MaterialCreator.getInstance();

const musterboxBottomMaterial = materialCreator.createStandardMaterialFromTexture("MusterboxBottom", {
	diffuseT: "/baked-textures/Musterbox/musterbox_back_combined_baked_color.jpg",
});
musterboxBottomMaterial.roughness = 0.32;

const musterbox01Material = materialCreator.createStandardMaterialFromTexture("Musterbox01", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_01_baked_color.jpg",
});
const musterbox02Material = materialCreator.createStandardMaterialFromTexture("Musterbox02", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_02_baked_color.jpg",
});

const musterbox03Material = materialCreator.createStandardMaterialFromTexture("Musterbox03", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_03_baked_color.jpg",
});

const musterbox04Material = materialCreator.createStandardMaterialFromTexture("Musterbox04", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_04_baked_color.jpg",
});

const musterbox05Material = materialCreator.createStandardMaterialFromTexture("Musterbox05", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_05_baked_color.jpg",
});

const musterbox06Material = materialCreator.createStandardMaterialFromTexture("Musterbox06", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_06_baked_color.jpg",
});

const musterbox07Material = materialCreator.createStandardMaterialFromTexture("Musterbox07", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_07_baked_color.jpg",
});

const musterbox08Material = materialCreator.createStandardMaterialFromTexture("Musterbox08", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_08_baked_color.jpg",
});

const musterbox09Material = materialCreator.createStandardMaterialFromTexture("Musterbox09", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_09_baked_color.jpg",
});

const musterbox10Material = materialCreator.createStandardMaterialFromTexture("Musterbox10", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_10_baked_color.jpg",
});

const musterbox11Material = materialCreator.createStandardMaterialFromTexture("Musterbox11", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_11_baked_color.jpg",
});

const musterbox12Material = materialCreator.createStandardMaterialFromTexture("Musterbox12", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_12_baked_color.jpg",
});

const musterbox13Material = materialCreator.createStandardMaterialFromTexture("Musterbox13", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_13_baked_color.jpg",
});

const musterbox14Material = materialCreator.createStandardMaterialFromTexture("Musterbox14", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_14_baked_color.jpg",
});

const musterbox15Material = materialCreator.createStandardMaterialFromTexture("Musterbox15", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_15_baked_color.jpg",
});

const musterbox16Material = materialCreator.createStandardMaterialFromTexture("Musterbox16", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_16_baked_color.jpg",
});

const musterbox17Material = materialCreator.createStandardMaterialFromTexture("Musterbox17", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_17_baked_color.jpg",
});

const musterbox18Material = materialCreator.createStandardMaterialFromTexture("Musterbox18", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_18_baked_color.jpg",
});

const musterbox19Material = materialCreator.createStandardMaterialFromTexture("Musterbox19", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_19_baked_color.jpg",
});

const musterbox20Material = materialCreator.createStandardMaterialFromTexture("Musterbox20", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_20_baked_color.jpg",
});

const musterbox21Material = materialCreator.createStandardMaterialFromTexture("Musterbox21", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_21_baked_color.jpg",
});

const musterbox22Material = materialCreator.createStandardMaterialFromTexture("Musterbox22", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_22_baked_color.jpg",
});

const musterbox23Material = materialCreator.createStandardMaterialFromTexture("Musterbox23", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_23_baked_color.jpg",
});

const musterbox24Material = materialCreator.createStandardMaterialFromTexture("Musterbox24", {
	diffuseT: "/baked-textures/Musterbox/musterbox_box_24_baked_color.jpg",
});

interface MusterboxUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const MusterboxUI: React.FC<MusterboxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;
	const MusterboxBottom: Mesh = nodes["MusterboxBoden"] as Mesh;
	const MusterboxInside: Mesh = nodes["MusterboxInside"] as Mesh;
	const MusterboxDeckel: Mesh = nodes["MusterboxDeckel"] as Mesh;
	const MusterboxLasche: Mesh = nodes["MusterboxLasche"] as Mesh;
	const MusterboxGriff: Mesh = nodes["MusterboxGriff"] as Mesh;
	const MusterboxBox01: Mesh = nodes["MusterboxBox01"] as Mesh;
	const MusterboxFaecher: Mesh = nodes["MusterboxFaecher"] as Mesh;

	const { musterboxDeckelRotation, musterboxDeckelPosition, musterboxLaschePosition, musterboxLascheRotation } = useControls("Musterbox", {
		musterboxDeckelRotation: { value: { x: 3.93, y: 0, z: 0 }, min: 0, max: Math.PI * 2, step: 0.01 },
		musterboxDeckelPosition: { value: { x: 0, y: -0.43, z: 0.17 }, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01 },
		musterboxLascheRotation: { value: { x: Math.PI, y: 0, z: 0 }, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01 },
		musterboxLaschePosition: { value: { x: 0, y: -0.22, z: 0.76 }, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01 },
	});

	return (
		<group name={name} position={[-3.183, 2.3, -2.625]} rotation={[-Math.PI / 2, 0, Math.PI]}>
			<mesh
				geometry={MusterboxBottom.geometry}
				position={MusterboxBottom.position}
				rotation={MusterboxBottom.rotation}
				scale={0.008}
				material={musterboxBottomMaterial}
			/>

			<mesh geometry={MusterboxInside.geometry} position={[0, 0.12, -0]} rotation={[0, 0, -Math.PI / 2]} scale={0.008} material={musterboxBottomMaterial} />

			<mesh
				geometry={MusterboxDeckel.geometry}
				position={[musterboxDeckelPosition.x, musterboxDeckelPosition.y, musterboxDeckelPosition.z]}
				rotation={[musterboxDeckelRotation.x, musterboxDeckelRotation.y, musterboxDeckelRotation.z]}
				scale={0.008}
				material={musterboxBottomMaterial}
			/>

			<mesh
				geometry={MusterboxLasche.geometry}
				position={[musterboxLaschePosition.x, musterboxLaschePosition.y, musterboxLaschePosition.z]}
				rotation={[musterboxLascheRotation.x, musterboxLascheRotation.y, musterboxLascheRotation.z]}
				scale={0.008}
				material={musterboxBottomMaterial}
			/>

			<mesh geometry={MusterboxGriff.geometry} position={[0.1, 0.12, 0.11]} rotation={[-Math.PI / 2, 0, 0]} scale={0.008} material={blackPlasticMaterial} />

			{/* <mesh geometry={MusterboxFaecher.geometry} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.009} /> */}

			{/* <group name="Musterboxes" position={[0.24, 0.01, 0]}>
				<mesh geometry={MusterboxBox01.geometry} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox01Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox02Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox03Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.44, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox04Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.59, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox05Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.74, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox06Material} />

				<mesh geometry={MusterboxBox01.geometry} position={[0, 0.145, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox07Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.15, 0.145, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox08Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.3, 0.145, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox09Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.44, 0.145, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox10Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.59, 0.145, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox11Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.74, 0.145, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox12Material} />

				<mesh geometry={MusterboxBox01.geometry} position={[0, 0.293, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox13Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.15, 0.293, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox14Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.3, 0.293, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox15Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.44, 0.293, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox16Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.59, 0.293, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox17Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.74, 0.293, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox18Material} />

				<mesh geometry={MusterboxBox01.geometry} position={[0, 0.44, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox19Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.15, 0.44, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox20Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.3, 0.44, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox21Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.44, 0.44, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox22Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.59, 0.44, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox23Material} />
				<mesh geometry={MusterboxBox01.geometry} position={[-0.74, 0.44, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.015} material={musterbox24Material} />
			</group> */}
		</group>
	);
};

export default MusterboxUI;
