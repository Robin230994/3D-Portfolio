import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, DoubleSide, Mesh } from "three";
import { blackPlasticMaterial, iot2Material } from "../../../Helper/GLMaterials";
import MaterialCreator from "../../../classes/MaterialCreator";
import { useControls } from "leva";
import { Group } from "three";

interface MusterboxUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: { setSelectObjectHovered: (hovered: { [name: string]: boolean }) => void } };
		refs: { myRefs: { musterboxRef: RefObject<Group> } };
	};
}

const MusterboxUI: React.FC<MusterboxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;
	const { setSelectObjectHovered } = myFunctions;
	const { musterboxRef } = myRefs;

	const MusterboxDeckel: Mesh = nodes["MusterboxDeckel"] as Mesh;
	const MusterboxLasche: Mesh = nodes["MusterboxLasche"] as Mesh;

	return (
		<group name={name}>
			<group
				ref={musterboxRef}
				onPointerOver={() => setSelectObjectHovered({ Musterbox: true })}
				onPointerOut={() => setSelectObjectHovered({ Musterbox: false })}>
				<mesh
					geometry={MusterboxDeckel.geometry}
					position={MusterboxDeckel.position}
					rotation={MusterboxDeckel.rotation}
					scale={MusterboxDeckel.scale}
					material={MusterboxDeckel.material}
				/>

				<mesh
					geometry={MusterboxLasche.geometry}
					position={MusterboxLasche.position}
					rotation={MusterboxLasche.rotation}
					scale={MusterboxLasche.scale}
					material={MusterboxLasche.material}
				/>
			</group>
		</group>
	);
};

export default MusterboxUI;
