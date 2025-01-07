import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { DirectionalLight, DoubleSide, Mesh } from "three";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const fcBoxHeadMaterial = materialCreator.createStandardMaterialFromTexture("FCBoxHead", {
	diffuseT: "/baked-textures/FC_Box/fc_box_head_baked_color.webp",
	normalT: "/baked-textures/FC_Box/fc_box_head_baked_normal.png",
	roughnessT: "/baked-textures/FC_Box/fc_box_head_baked_roughness.webp",
	metallnessT: "/baked-textures/FC_Box/fc_box_head_baked_metallness.webp",
});
const fcBoxBottomMaterial = materialCreator.createStandardMaterialFromTexture("FCBoxBottom", {
	diffuseT: "/baked-textures/FC_Box/fc_box_bottom_baked_color.webp",
	normalT: "/baked-textures/FC_Box/fc_box_bottom_baked_normal.png",
	roughnessT: "/baked-textures/FC_Box/fc_box_bottom_baked_roughness.webp",
	metallnessT: "/baked-textures/FC_Box/fc_box_bottom_baked_metallness.webp",
});
const fcBoxTubMaterial = materialCreator.createStandardMaterialFromTexture("FCBoxTub", {
	diffuseT: "/baked-textures/FC_Box/fc_box_tub_baked_color.webp",
});
const fcBoxDividerMaterial = materialCreator.createStandardMaterialFromTexture("FCBoxDivider", {
	diffuseT: "/baked-textures/FC_Box/fc_box_divider_baked_color.webp",
});
fcBoxDividerMaterial.side = DoubleSide;

interface FCBoxUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const FCBoxUI: React.FC<FCBoxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const FCBoxHeadBottomPart: Mesh = nodes["FCBoxHBottomPart"] as Mesh;
	const FCBoxDividerBottomPart: Mesh = nodes["FCBoxDBottomPart"] as Mesh;
	const FCBoxBottomBottomPart: Mesh = nodes["FCBoxBBottomPart"] as Mesh;
	const FCBoxKuelherBottomPart: Mesh = nodes["FCBoxKuehlerBottomPart"] as Mesh;

	return (
		<group name={name} position={[0.552, 2.297, -2.164]}>
			<group name="Head" rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, -0.35]}>
				<mesh geometry={FCBoxHeadBottomPart.geometry} scale={0.01} material={fcBoxHeadMaterial} />
			</group>

			<group name="Divider" rotation={[Math.PI / 2, 0, 0]} position={[0, 0.072, -0.35]}>
				<mesh geometry={FCBoxDividerBottomPart.geometry} rotation={FCBoxDividerBottomPart.rotation} scale={0.01} material={fcBoxDividerMaterial} />
			</group>

			<group name="Bottom" rotation={[-Math.PI / 2, 0, -Math.PI]} position={[0, 0, -0.35]}>
				<mesh geometry={FCBoxBottomBottomPart.geometry} scale={0.01} material={fcBoxBottomMaterial} />
			</group>

			<group name="Kuehler" position={[0, 0, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
				<mesh geometry={FCBoxKuelherBottomPart.geometry} scale={0.01} material={fcBoxTubMaterial} />
			</group>
		</group>
	);
};

export default FCBoxUI;
