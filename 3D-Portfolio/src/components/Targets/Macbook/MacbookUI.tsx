import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Mesh, DirectionalLight, Material } from "three";
import { useControls } from "leva";
import { Group } from "three";
import { Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { useFocusStore } from "../../../Stores/useFocusStore";

import CloseLabel from "../../CloseLabel/CloseLabel";
import MacbookDesktop from "./MacbookDesktop";

interface MacbookUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };

				cameraIsMoving: boolean;
				hovered: string | null;
				screenVisible: boolean;
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
		refs: { myRefs: { macbookRef: RefObject<Group>; macbookTopSideRef: RefObject<Mesh> } };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, cameraIsMoving, hovered, screenVisible } = myData;
	const { events, dispatch } = myFunctions;
	const { macbookRef, macbookTopSideRef } = myRefs;

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);

	const MacbookTopSide: Mesh = nodes["MacbookTopSide"] as Mesh;
	const macbookTopSideMaterial = MacbookTopSide.material as Material;

	const { backLabelPos, backLabelRot } = useControls("Macbook", {
		backLabelPos: { value: { x: -4.1, y: 0, z: -0.9 }, step: 0.1 },
		backLabelRot: { value: { x: -Math.PI / 2, y: 0.9, z: 0 }, step: 0.1 },
	});

	return (
		<group ref={macbookRef} {...events}>
			<mesh
				name={"MacbookTopSide"}
				ref={macbookTopSideRef}
				geometry={MacbookTopSide.geometry}
				position={MacbookTopSide.position}
				rotation={MacbookTopSide.rotation}
				scale={MacbookTopSide.scale}
				material={macbookTopSideMaterial}>
				<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />

				<CloseLabel
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					dispatch={() => dispatch()}>
					x
				</CloseLabel>
				{screenVisible && <MacbookDesktop />}
			</mesh>

			{/* <FloatingSign visible={hoveredObject === name} position={[0, 0, 0]} rotation={[0, 0, 0]} size={0.13} height={0.05} /> */}
		</group>
	);
};

export default MacbookUI;
