import React, { RefObject, useEffect } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Mesh, DirectionalLight, Object3D, Material } from "three";
import { useControls } from "leva";
import { Group } from "three";

import MaterialCreator from "../../../classes/MaterialCreator";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

const materialCreator = MaterialCreator.getInstance();

interface MacbookUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: {
					name: string;
					object: Object3D;
				} | null;
				cameraIsMoving: boolean;
			};
		};
		functions: {
			myFunctions: {
				setSelectObjectFocus: React.Dispatch<
					React.SetStateAction<{
						name: string;
						object: Object3D;
					} | null>
				>;
				setIsAnyHovered: React.Dispatch<React.SetStateAction<boolean>>;
			};
		};
		refs: { myRefs: { macbookRef: RefObject<Group> } };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving } = myData;
	const { setSelectObjectFocus, setIsAnyHovered } = myFunctions;
	const { macbookRef } = myRefs;

	const MacbookTopSide: Mesh = nodes["MacbookTopSide"] as Mesh;
	const macbookTopSideMaterial = MacbookTopSide.material as Material;

	const { backLabelPos } = useControls("Macbook", {
		backLabelPos: { value: { x: -1.2, y: 0, z: -14.5 }, step: 0.1 },
	});

	useEffect(() => {
		macbookTopSideMaterial.alphaTest = 0.5;
		materialCreator.addInstanciatedMaterial("ot5Material", macbookTopSideMaterial);
	}, [macbookTopSideMaterial]);

	return (
		<group
			name={name}
			ref={macbookRef}
			onClick={() => {
				if (macbookRef.current) {
					setSelectObjectFocus({ name: name, object: macbookRef.current });
				}
			}}
			onPointerOver={() => {
				if (selectObjectFocus === null) setIsAnyHovered(true);
			}}
			onPointerOut={() => setIsAnyHovered(false)}>
			<mesh
				geometry={MacbookTopSide.geometry}
				position={MacbookTopSide.position}
				rotation={MacbookTopSide.rotation}
				scale={MacbookTopSide.scale}
				material={macbookTopSideMaterial}
			/>
			<InteractionLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => setSelectObjectFocus(null)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
					<path
						fillRule="evenodd"
						d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
						clipRule="evenodd"
					/>
				</svg>
			</InteractionLabel>
		</group>
	);
};

export default MacbookUI;
