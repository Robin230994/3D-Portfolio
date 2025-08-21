import React, { useEffect } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Mesh, DirectionalLight, Object3D, Material } from "three";
import MaterialCreator from "../../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

interface MacbookUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectHovered: { [name: string]: boolean };
			};
		};
		functions: {
			myFunctions: { setSelectObjectHovered: (hovered: { [name: string]: boolean }) => void; handleClickedTarget: (targetObject: Object3D) => void };
		};
		refs: { myRefs: object };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectHovered } = myData;

	const MacbookTopSide: Mesh = nodes["MacbookTopSide"] as Mesh;
	const macbookTopSideMaterial = MacbookTopSide.material as Material;

	useEffect(() => {
		macbookTopSideMaterial.alphaTest = 0.5;
		materialCreator.addInstanciatedMaterial("ot5Material", macbookTopSideMaterial);
	}, [macbookTopSideMaterial]);

	return (
		<group name={name}>
			<mesh
				geometry={MacbookTopSide.geometry}
				position={MacbookTopSide.position}
				rotation={MacbookTopSide.rotation}
				scale={MacbookTopSide.scale}
				material={macbookTopSideMaterial}
			/>
		</group>
	);
};

export default MacbookUI;
