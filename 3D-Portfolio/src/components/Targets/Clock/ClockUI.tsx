import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { BufferGeometry, Material, NormalBufferAttributes, Object3D, Object3DEventMap } from "three";
import { Outlines } from "@react-three/drei";
import { useControls } from "leva";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface ClockUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: {
					name: string;
					object: Object3D<Object3DEventMap>;
				} | null;
				hoveredObject: string | null;
				cameraIsMoving: boolean;
			};
		};
		functions: {
			myFunctions: {
				setSelectObjectFocus: (
					focus: {
						name: string;
						object: Object3D<Object3DEventMap>;
					} | null,
				) => void;
				setHoveredObject: (objectName: string | null) => void;
			};
		};
		refs: {
			myRefs: {
				minuteRef: React.RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>;
				hourRef: React.RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>;
			};
		};
	};
}

const ClockUI: React.FC<ClockUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, hoveredObject, cameraIsMoving } = myData;
	const { setHoveredObject, setSelectObjectFocus } = myFunctions;
	const { minuteRef, hourRef } = myRefs;
	const MinuteHand = nodes["MinuteHand"] as Mesh;
	const HourHand = nodes["HourHand"] as Mesh;

	const { backLabelPos, backLabelRot } = useControls("Clock UI btn", {
		backLabelPos: { value: { x: -0.1, y: 0.3, z: 0 }, step: 0.1 },
		backLabelRot: { value: { x: 0, y: 0, z: -0.5 }, step: 0.1 },
	});

	return (
		<group name={name}>
			<mesh
				ref={minuteRef}
				geometry={MinuteHand.geometry}
				position={MinuteHand.position}
				rotation={MinuteHand.rotation}
				material={MinuteHand.material}
				scale={MinuteHand.scale}
				onClick={() => {
					if (minuteRef.current) {
						setSelectObjectFocus({ name: name, object: minuteRef.current });
					}
				}}
				onPointerOver={() => {
					if (selectObjectFocus === null) setHoveredObject(name);
				}}
				onPointerOut={() => setHoveredObject(null)}>
				<Outlines thickness={2} scale={hoveredObject === name ? 1 : 0} color={"white"} />

				<InteractionLabel
					name="clock-ui-btn"
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					scaleFactor={0.1}
					dispatch={() => {
						setSelectObjectFocus(null);
					}}>
					x
				</InteractionLabel>
			</mesh>
			<mesh
				ref={hourRef}
				geometry={HourHand.geometry}
				position={HourHand.position}
				rotation={HourHand.rotation}
				material={HourHand.material}
				scale={HourHand.scale}
				onClick={() => {
					if (hourRef.current) {
						setSelectObjectFocus({ name: name, object: hourRef.current });
					}
				}}
				onPointerOver={() => {
					if (selectObjectFocus === null) setHoveredObject(name);
				}}
				onPointerOut={() => setHoveredObject(null)}
			/>
		</group>
	);
};

export default ClockUI;
