import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, DoubleSide, Group, Mesh } from "three";
import { Select } from "@react-three/postprocessing";
import MaterialCreator from "../../../classes/MaterialCreator";
import { CameraControls } from "@react-three/drei";
import { Object3D } from "three";
import { useControls } from "leva";
import HoverLabel from "../../HoverLabel/HoverLabel";
import { iot2Material } from "../../../Helper/GLMaterials";

const materialCreator = MaterialCreator.getInstance();

const fcBoxDividerMaterial = materialCreator.createStandardMaterialFromTexture("FCBoxDivider", {
	diffuseT: "/baked-textures/FC_Box/fc_box_divider_baked_color.webp",
});
fcBoxDividerMaterial.side = DoubleSide;

interface FCBoxUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight }; selectObjectHovered: { [name: string]: boolean } } };
		functions: {
			myFunctions: { setSelectObjectHovered: (hovered: { [name: string]: boolean }) => void; handleClickedTarget: (targetObject: Object3D) => void };
		};
		refs: { myRefs: { fcBoxRef: RefObject<Group> } };
	};
}

const FCBoxUI: React.FC<FCBoxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectHovered } = myData;
	const { setSelectObjectHovered, handleClickedTarget } = myFunctions;
	const { fcBoxRef } = myRefs;

	const FCBoxTop: Mesh = nodes["FCBoxTop"] as Mesh;

	const { fcBoxPos } = useControls("FCBox", {
		fcBoxPos: { value: { x: 0.552, y: 2.297, z: -2.1 }, step: 0.001 },
	});

	return (
		<React.Fragment>
			{/* <Select enabled={selectObjectHovered["FCBox"] === true}> */}
			<group
				name={name}
				ref={fcBoxRef}
				onPointerOver={() => setSelectObjectHovered({ FCBox: true })}
				onPointerOut={() => setSelectObjectHovered({ FCBox: false })}
				onClick={() => {
					if (fcBoxRef.current) {
						handleClickedTarget(fcBoxRef.current);
					}
				}}>
				<mesh geometry={FCBoxTop.geometry} position={FCBoxTop.position} rotation={FCBoxTop.rotation} material={iot2Material} scale={FCBoxTop.scale} />
				{/* <HoverLabel visible={selectObjectHovered["FCBox"] === true}>Franconian Coolness Box</HoverLabel> */}
			</group>
			{/* </Select> */}
		</React.Fragment>
	);
};

export default FCBoxUI;
