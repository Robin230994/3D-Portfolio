import React from "react";
import { IUIComponentProps } from "../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import MaterialCreator from "../../classes/MaterialCreator";
import { useHoverContext } from "../../Helper/Context/SelectHoverObjectContext";
import { Select } from "@react-three/postprocessing";

const materialCreator = MaterialCreator.getInstance();

const occulusMaterial = materialCreator.createStandardMaterialFromTexture("Occulus", {
	diffuseT: "/baked-textures/Occulus/occulus_baked_color.webp",
	roughnessT: "/baked-textures/Occulus/occulus_baked_roughness.webp",
	normalT: "/baked-textures/Occulus/occulus_baked_normal.png",
});

const occulusControllerMaterial = materialCreator.createStandardMaterialFromTexture("OcculusController", {
	diffuseT: "/baked-textures/Occulus/occulus_controler_baked_color.webp",
});

interface OccolusQuestUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: object };
		refs: { myRefs: object };
	};
}

const OccolusQuestUI: React.FC<OccolusQuestUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;

	/** CONTEXT */
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();

	const OcculusFront: Mesh = nodes["FrontOcculus"] as Mesh;
	const OcculusBack: Mesh = nodes["BackOcculus"] as Mesh;
	const OcculusControler: Mesh = nodes["FirstController"] as Mesh;

	return (
		<Select enabled={selectObjectHovered}>
			<group name={name} onPointerOver={() => setSelectObjectHovered(true)} onPointerOut={() => setSelectObjectHovered(false)}>
				<mesh geometry={OcculusFront.geometry} position={OcculusFront.position} rotation={OcculusFront.rotation} material={occulusMaterial} />
				<mesh geometry={OcculusBack.geometry} position={OcculusBack.position} rotation={OcculusBack.rotation} material={occulusMaterial} />
				<mesh geometry={OcculusControler.geometry} position={[3.575, 1.22, -1.762]} rotation={OcculusControler.rotation} material={occulusControllerMaterial} />
				<mesh geometry={OcculusControler.geometry} position={[3.448, 1.22, -1.962]} rotation={OcculusControler.rotation} material={occulusControllerMaterial} />
			</group>
		</Select>
	);
};

export default OccolusQuestUI;
