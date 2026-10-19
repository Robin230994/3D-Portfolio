import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../utils/Types";
import { Mesh, DirectionalLight, Material } from "three";
import { Group } from "three";

import MacbookDesktop from "./MacbookDesktop";
import { Detailed } from "@react-three/drei";

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
	const { setActiveTab } = myFunctions;
	const { macbookRef, macbookTopSideRef } = myRefs;

	const MacbookTopSide: Mesh = nodes["MacbookTopSide"] as Mesh;
	const MacbookTopSideLP: Mesh = nodes["MacbookTopSide_LP"] as Mesh;
	const macbookTopSideMaterial = MacbookTopSide.material as Material;

	return (
		<group ref={macbookRef}>
			<Detailed distances={[0, 5]}>
				<mesh
					name={name}
					ref={macbookTopSideRef}
					geometry={MacbookTopSide.geometry}
					position={MacbookTopSide.position}
					rotation={MacbookTopSide.rotation}
					scale={MacbookTopSide.scale}
					material={macbookTopSideMaterial}>
					{screenVisible && <MacbookDesktop props={{ activeTab, setActiveTab }} />}
				</mesh>

				<mesh
					geometry={MacbookTopSideLP.geometry}
					position={MacbookTopSideLP.position}
					rotation={MacbookTopSideLP.rotation}
					scale={MacbookTopSideLP.scale}
					material={macbookTopSideMaterial}
				/>
			</Detailed>
		</group>
	);
};

export default MacbookUI;
