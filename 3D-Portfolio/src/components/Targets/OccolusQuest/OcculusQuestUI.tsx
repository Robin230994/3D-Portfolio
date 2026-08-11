import React, { RefObject } from "react";
import CloseLabel from "../../CloseLabel/CloseLabel";

import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh, Group } from "three";
import { useControls } from "leva";
import { Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { useFocusStore } from "../../../Stores/useFocusStore";

interface OccolusQuestUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };

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
		refs: { myRefs: { occulusRef: RefObject<Group> } };
	};
}

const OccolusQuestUI: React.FC<OccolusQuestUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, cameraIsMoving, hovered } = myData;
	const { events, dispatch } = myFunctions;
	const { occulusRef } = myRefs;

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);

	const OcculusHeadset: Mesh = nodes["OcculusHeadset"] as Mesh;
	const OcculusControler: Mesh = nodes["OcculusController"] as Mesh;

	const { occulusPosition, occulusRotation, backLabelPos, backLabelRot } = useControls("OcculusHeadset", {
		occulusPosition: { value: { x: 3.37, y: 1.28, z: -1.39 }, step: 0.01 },
		occulusRotation: { value: { x: -1.75, y: -0.08, z: 0.43 }, step: 0.01 },
		backLabelPos: { value: { x: -0.7, y: 0.1, z: -0.2 }, step: 0.1 },
		backLabelRot: { value: { x: 0.2, y: 0, z: -0.3 }, step: 0.1 },
	});

	return (
		<group ref={occulusRef} {...events}>
			<mesh
				name={name}
				geometry={OcculusHeadset.geometry}
				position={[occulusPosition.x, occulusPosition.y, occulusPosition.z]}
				rotation={[occulusRotation.x, occulusRotation.y, occulusRotation.z]}
				scale={OcculusHeadset.scale}
				material={OcculusHeadset.material}>
				<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
				<CloseLabel
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
					scaleFactor={0.5}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					dispatch={() => dispatch()}>
					x
				</CloseLabel>
			</mesh>

			<mesh
				geometry={OcculusControler.geometry}
				position={OcculusControler.position}
				rotation={OcculusControler.rotation}
				scale={OcculusControler.scale}
				material={OcculusControler.material}
			/>
		</group>
	);
};

export default OccolusQuestUI;
