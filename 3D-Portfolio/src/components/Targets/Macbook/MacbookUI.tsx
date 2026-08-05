import React, { RefObject, useEffect } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Mesh, DirectionalLight, Object3D, Material } from "three";
import { useControls } from "leva";
import { Group } from "three";
import { Outlines } from "@react-three/drei";

import MaterialCreator from "../../../classes/MaterialCreator";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";

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
				hovered: string | null;
			};
		};
		functions: {
			myFunctions: {
				dispatch: () => void;
				events: {
					onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
			};
		};
		refs: { myRefs: { macbookRef: RefObject<Group> } };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving, hovered } = myData;
	const { events, dispatch } = myFunctions;
	const { macbookRef } = myRefs;

	const MacbookTopSide: Mesh = nodes["MacbookTopSide"] as Mesh;
	const macbookTopSideMaterial = MacbookTopSide.material as Material;

	const { backLabelPos, backLabelRot } = useControls("Macbook", {
		backLabelPos: { value: { x: -1.05, y: 0.4, z: -4.2 }, step: 0.1 },
		backLabelRot: { value: { x: -Math.PI / 2, y: 0, z: 0 }, step: 0.1 },
	});

	useEffect(() => {
		macbookTopSideMaterial.alphaTest = 0.5;
		materialCreator.addInstanciatedMaterial("ot5Material", macbookTopSideMaterial);
	}, [macbookTopSideMaterial, selectObjectFocus]);

	return (
		<group ref={macbookRef} {...events}>
			<mesh
				name={name}
				geometry={MacbookTopSide.geometry}
				position={MacbookTopSide.position}
				rotation={MacbookTopSide.rotation}
				scale={MacbookTopSide.scale}
				material={macbookTopSideMaterial}>
				<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />

				<InteractionLabel
					name="macbook-ui-btn"
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					dispatch={() => dispatch()}>
					x
				</InteractionLabel>
			</mesh>

			{/* <FloatingSign visible={hoveredObject === name} position={[0, 0, 0]} rotation={[0, 0, 0]} size={0.13} height={0.05} /> */}
		</group>
	);
};

export default MacbookUI;
