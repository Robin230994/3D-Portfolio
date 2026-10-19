import React, { memo, RefObject } from "react";

import { IUIComponentProps } from "../../../utils/Types";
import { DirectionalLight, Mesh, Group } from "three";
import { useControls } from "leva";
import { Detailed, Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";

interface OccolusQuestUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hovered: string | null;
			};
		};
		functions: {
			myFunctions: {
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

	const { name, nodes, hovered } = myData;
	const { events } = myFunctions;
	const { occulusRef } = myRefs;

	const OcculusHeadset: Mesh = nodes["OcculusHeadset"] as Mesh;
	const OcculusHeadsetLP: Mesh = nodes["OcculusHeadset_LP"] as Mesh;
	const OcculusController: Mesh = nodes["OcculusController"] as Mesh;
	const OcculusControllerLP: Mesh = nodes["OcculusController_LP"] as Mesh;

	const { occulusPosition, occulusRotation, secondControllerPosition } = useControls("OcculusHeadset", {
		occulusPosition: { value: { x: 3.37, y: 1.28, z: -1.39 }, step: 0.01 },
		occulusRotation: { value: { x: -1.75, y: -0.08, z: 0.43 }, step: 0.01 },
		secondControllerPosition: { value: { x: 3.65, y: 1.21, z: -1.5 }, setp: 0.01 },
	});

	return (
		<group ref={occulusRef} {...events}>
			<group
				position={[occulusPosition.x, occulusPosition.y, occulusPosition.z]}
				rotation={[occulusRotation.x, occulusRotation.y, occulusRotation.z]}
				scale={OcculusHeadset.scale}>
				<Detailed distances={[0, 1.5]}>
					<mesh name={name} geometry={OcculusHeadset.geometry} material={OcculusHeadset.material}>
						<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
					</mesh>

					<mesh name={name} geometry={OcculusHeadsetLP.geometry} material={OcculusHeadsetLP.material}>
						<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
					</mesh>
				</Detailed>
			</group>

			<group position={OcculusController.position} rotation={OcculusController.rotation} scale={OcculusController.scale}>
				<Detailed distances={[0, 1.5]}>
					<mesh geometry={OcculusController.geometry} material={OcculusController.material} />
					<mesh geometry={OcculusControllerLP.geometry} material={OcculusControllerLP.material} />
				</Detailed>
			</group>

			<group
				position={[secondControllerPosition.x, secondControllerPosition.y, secondControllerPosition.z]}
				rotation={OcculusController.rotation}
				scale={OcculusController.scale}>
				<Detailed distances={[0, 1.5]}>
					<mesh geometry={OcculusController.geometry} material={OcculusController.material} />
					<mesh geometry={OcculusControllerLP.geometry} material={OcculusControllerLP.material} />
				</Detailed>
			</group>
		</group>
	);
};

export default memo(OccolusQuestUI);
