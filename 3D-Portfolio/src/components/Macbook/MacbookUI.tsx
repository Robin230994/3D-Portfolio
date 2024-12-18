import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { Color, Mesh } from "three";
import { DirectionalLight } from "three";
import { metalMaterial } from "../../Helper/GLMaterials";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const macbookHousingMaterial = materialCreator.createEmptyStandardMaterial("MacbookHousing");
macbookHousingMaterial.metalness = metalMaterial.metalness;
macbookHousingMaterial.color = new Color("#C0C0C0");
macbookHousingMaterial.roughness = 0.35;

const macbookScreenMaterial = materialCreator.createStandardMaterialFromTexture("MacbookScreen", {
	diffuseT: "/baked-textures/Macbook/macbook_screen_logo_color_baked.jpg",
	roughnessT: "/baked-textures/Macbook/macbook_screen_logo_roughness_baked.jpg",
});

const macbookKeysMaterial = materialCreator.createStandardMaterialFromTexture("MacbookKeys", {
	diffuseT: "/baked-textures/Macbook/macbook_keys_color_baked.webp",
});

interface MacbookUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	const MacbookHousing: Mesh = nodes["Housing"] as Mesh;
	const MacbookScreen: Mesh = nodes["Screen"] as Mesh;
	const MacbookKeyboard: Mesh = nodes["Keyboard"] as Mesh;
	const MacbookVentilation: Mesh = nodes["Ventilation"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={MacbookHousing.geometry} position={MacbookHousing.position} rotation={MacbookHousing.rotation} material={macbookHousingMaterial} />
			<mesh geometry={MacbookScreen.geometry} position={MacbookScreen.position} rotation={MacbookScreen.rotation} material={macbookHousingMaterial} />
			<mesh geometry={MacbookVentilation.geometry} position={MacbookVentilation.position} rotation={MacbookVentilation.rotation} material={metalMaterial} />
			<mesh geometry={MacbookKeyboard.geometry} position={MacbookKeyboard.position} rotation={MacbookKeyboard.rotation} material={macbookKeysMaterial} />
		</group>
	);
};

export default MacbookUI;
