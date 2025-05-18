import React from "react";
import { GLTFResult, IUIComponentProps } from "../../types/GLTypes";
import { Color, Mesh, DirectionalLight } from "three";
import { blackPlasticMaterial, metalMaterial } from "../../Helper/GLMaterials";
import { useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();
const macbookHousingMaterial = materialCreator.createEmptyStandardMaterial("MacbookHousing");
macbookHousingMaterial.metalness = metalMaterial.metalness;
macbookHousingMaterial.color = new Color("#C0C0C0");
macbookHousingMaterial.roughness = 0.35;

const macbookScreenMaterial = materialCreator.createStandardMaterialFromTexture("MacbookScreen", {
	diffuseT: "./baked-textures/Macbook/macbook_screen_apple_logo_color_baked.png",
});
macbookScreenMaterial.metalness = 1;
macbookScreenMaterial.color = new Color("#C0C0C0");
macbookScreenMaterial.transparent = true;

const macbookKeysMaterial = materialCreator.createStandardMaterialFromTexture("MacbookKeys", {
	diffuseT: "/baked-textures/Macbook/macbook_keys_color_baked.webp",
});

interface MacbookUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight }; selectObjectHovered: { [name: string]: boolean } } };
		functions: { myFunctions: { setSelectObjectHovered: (hovered: { [name: string]: boolean }) => void } };
		refs: { myRefs: object };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectHovered } = myData;
	const { setSelectObjectHovered } = myFunctions;

	/** Meshes */
	const Macbook = useGLTF("./macbook.glb") as unknown as GLTFResult;
	const macbookNodes = Macbook.nodes;

	const MacbookScreenBackside = macbookNodes["Cube033"] as Mesh;
	const MacbookFrontScreen = macbookNodes["Cube033_2"] as Mesh;
	const MacbookScreenBorder = macbookNodes["Cube033_3"] as Mesh;
	const MacbookAppleLogo = macbookNodes["Cube033_8"] as Mesh;
	const MacbookScreen: Mesh = nodes["Screen"] as Mesh;
	const MacbookHousing: Mesh = nodes["Housing"] as Mesh;
	const MacbookKeyboard: Mesh = nodes["Keyboard"] as Mesh;
	const MacbookVentilation: Mesh = nodes["Ventilation"] as Mesh;

	return (
		<React.Fragment>
			<Select enabled={selectObjectHovered["Macbook"] === true}>
				<group name={name} onPointerOver={() => setSelectObjectHovered({ Macbook: true })} onPointerOut={() => setSelectObjectHovered({ Macbook: false })}>
					{MacbookHousing.children.map((child, index) => {
						const castedChild = child as Mesh;

						return (
							<mesh
								key={index}
								geometry={castedChild.geometry}
								position={castedChild.position}
								rotation={castedChild.rotation}
								material={castedChild.material}
								scale={10}
							/>
						);
					})}

					{MacbookScreen.children.map((child, index) => {
						const castedChild = child as Mesh;

						return (
							<mesh
								key={index}
								geometry={castedChild.geometry}
								position={castedChild.position}
								rotation={castedChild.rotation}
								material={castedChild.material}
							/>
						);
					})}
					<group position={[5.641, 1.173, -1.776]} rotation={[1.333, 0, 0]}>
						<mesh geometry={MacbookScreenBackside.geometry} material={macbookHousingMaterial} />
						<mesh geometry={MacbookFrontScreen.geometry} material={blackPlasticMaterial} />
						<mesh geometry={MacbookScreenBorder.geometry} material={blackPlasticMaterial} />
						<mesh geometry={MacbookAppleLogo.geometry} material={macbookScreenMaterial} />
					</group>

					<mesh geometry={MacbookVentilation.geometry} position={MacbookVentilation.position} rotation={MacbookVentilation.rotation} material={metalMaterial} />
					<mesh geometry={MacbookKeyboard.geometry} position={MacbookKeyboard.position} rotation={MacbookKeyboard.rotation} material={macbookKeysMaterial} />
				</group>
			</Select>
		</React.Fragment>
	);
};

export default MacbookUI;
