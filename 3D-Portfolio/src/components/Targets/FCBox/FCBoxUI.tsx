import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Group, Mesh } from "three";
import { Object3D } from "three";
import { useControls } from "leva";
import { iot2Material } from "../../../Helper/GLMaterials";
import { Outlines } from "@react-three/drei";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface FCBoxUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: { name: string; object: Object3D } | null;
				cameraIsMoving: boolean;
				hoveredObject: string | null;
			};
		};
		functions: {
			myFunctions: {
				setSelectObjectFocus: (
					focus: {
						name: string;
						object: Object3D;
					} | null
				) => void;
				setHoveredObject: (objectName: string | null) => void;
			};
		};
		refs: { myRefs: { fcBoxRef: RefObject<Group> } };
	};
}

const FCBoxUI: React.FC<FCBoxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving, hoveredObject } = myData;
	const { setSelectObjectFocus, setHoveredObject } = myFunctions;
	const { fcBoxRef } = myRefs;

	const FCBoxTop: Mesh = nodes["FCBoxTop"] as Mesh;

	const { backLabelPos, backLabelRot } = useControls("FCBoxLabel", {
		backLabelPos: { value: { x: -35.0, y: 0, z: 11.7 }, step: 0.1 },
		backLabelRot: { value: { x: -Math.PI / 2, y: 0, z: 0 }, step: 0.1 },
	});

	return (
		<>
			<group
				name={name}
				ref={fcBoxRef}
				onClick={() => {
					if (fcBoxRef.current) {
						setSelectObjectFocus({ name: name, object: fcBoxRef.current });
					}
				}}
				onPointerOver={() => {
					if (selectObjectFocus === null) setHoveredObject(name);
				}}
				onPointerOut={() => setHoveredObject(null)}>
				<group>
					<group position={FCBoxTop.position} rotation={FCBoxTop.rotation}>
						<mesh geometry={FCBoxTop.geometry} scale={FCBoxTop.scale} material={iot2Material}>
							<InteractionLabel
								name="fc-box-ui"
								scaleFactor={20}
								labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
								labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
								visible={!cameraIsMoving && selectObjectFocus?.name === name}
								dispatch={() => setSelectObjectFocus(null)}>
								x
							</InteractionLabel>

							<Outlines thickness={2} scale={hoveredObject === name ? 1 : 0} color={"white"} />
						</mesh>
					</group>
				</group>
			</group>
		</>
	);
};

export default FCBoxUI;
