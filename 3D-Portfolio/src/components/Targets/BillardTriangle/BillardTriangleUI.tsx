import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Group, Mesh } from "three";
import { t3Material } from "../../../Helper/GLMaterials";
import { Object3D } from "three";
import { useControls } from "leva";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface BillardTriangleUIProps extends IUIComponentProps {
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
				dispatch: () => void;
				events: {
					onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
			};
		};
		refs: { myRefs: { triangleRef: RefObject<Group> } };
	};
}

const BillardTriangleUI: React.FC<BillardTriangleUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving } = myData;
	const { dispatch, events } = myFunctions;
	const { triangleRef } = myRefs;

	const PoolBall8: Mesh = nodes["PoolBall8"] as Mesh;

	const { backLabelPos, backLabelRot } = useControls("BillardTriangle", {
		backLabelPos: { value: { x: -0.15, y: 0, z: -0.3 }, step: 0.1 },
		backLabelRot: { value: { x: 1.4, y: 3.1, z: -0.35 }, step: 0.1 },
	});

	return (
		<group name={name} ref={triangleRef} {...events}>
			<mesh geometry={PoolBall8.geometry} material={t3Material} position={PoolBall8.position} rotation={PoolBall8.rotation}>
				<InteractionLabel
					name="triangle-ui-btn"
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
					scaleFactor={0.2}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					dispatch={() => dispatch()}>
					x
				</InteractionLabel>
			</mesh>
		</group>
	);
};

export default BillardTriangleUI;
