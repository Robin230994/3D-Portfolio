import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Mesh, DirectionalLight, Material } from "three";
import { Group } from "three";

import MacbookDesktop from "./MacbookDesktop";

interface MacbookUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				screenVisible: boolean;
				activeTab: "About me" | "Projects" | "Websites" | "Apps";
			};
		};
		functions: {
			myFunctions: {
				setActiveTab: React.Dispatch<React.SetStateAction<"About me" | "Projects" | "Websites" | "Apps">>;
				setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
			};
		};
		refs: { myRefs: { macbookRef: RefObject<Group>; macbookTopSideRef: RefObject<Mesh> } };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, screenVisible, activeTab } = myData;
	const { setActiveTab, setIsHovered } = myFunctions;
	const { macbookRef, macbookTopSideRef } = myRefs;

	const MacbookTopSide: Mesh = nodes["MacbookTopSide"] as Mesh;
	const macbookTopSideMaterial = MacbookTopSide.material as Material;

	return (
		<group ref={macbookRef}>
			<mesh
				name={name}
				ref={macbookTopSideRef}
				geometry={MacbookTopSide.geometry}
				position={MacbookTopSide.position}
				rotation={MacbookTopSide.rotation}
				scale={MacbookTopSide.scale}
				material={macbookTopSideMaterial}
				onPointerLeave={() => setIsHovered(false)}>
				{screenVisible && <MacbookDesktop props={{ activeTab, setActiveTab, setIsHovered }} />}
			</mesh>
		</group>
	);
};

export default MacbookUI;
