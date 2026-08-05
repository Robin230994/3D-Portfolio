import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Group, Mesh } from "three";
import { useControls } from "leva";
import { iot2Material } from "../../../Helper/GLMaterials";
import { Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { useFocusStore } from "../../../Stores/useFocusStore";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface FCBoxUIProps extends IUIComponentProps {
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
		refs: { myRefs: { fcBoxRef: RefObject<Group> } };
	};
}

const FCBoxUI: React.FC<FCBoxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, cameraIsMoving, hovered } = myData;
	const { dispatch, events } = myFunctions;
	const { fcBoxRef } = myRefs;

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);

	const FCBoxTop: Mesh = nodes["FCBoxTop"] as Mesh;

	const { backLabelPos, backLabelRot } = useControls("FCBoxLabel", {
		backLabelPos: { value: { x: -35.0, y: 0, z: 11.7 }, step: 0.1 },
		backLabelRot: { value: { x: -Math.PI / 2, y: 0, z: 0 }, step: 0.1 },
	});

	return (
		<>
			<group ref={fcBoxRef} {...events}>
				<group>
					<group position={FCBoxTop.position} rotation={FCBoxTop.rotation}>
						<mesh name={name} geometry={FCBoxTop.geometry} scale={FCBoxTop.scale} material={iot2Material}>
							<InteractionLabel
								name="fc-box-ui"
								scaleFactor={20}
								labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
								labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
								visible={!cameraIsMoving && selectObjectFocus?.name === name}
								dispatch={() => dispatch()}>
								x
							</InteractionLabel>

							<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
						</mesh>
					</group>
				</group>
			</group>
		</>
	);
};

export default FCBoxUI;
