import React, { memo, RefObject } from "react";
import { IUIComponentProps } from "../../../utils/Types";
import { DirectionalLight, Group, Mesh, Object3D, Object3DEventMap } from "three";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { Outlines } from "@react-three/drei/core/Outlines";

interface BillardTriangleUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				cameraIsMoving: boolean;
				hovered: string | null;
				selectObjectFocus: {
					name: string;
					object: Object3D<Object3DEventMap>;
				} | null;
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
		refs: { myRefs: { triangleRef: RefObject<Group>; ball8Ref: RefObject<Mesh> } };
	};
}

const BillardTriangleUI: React.FC<BillardTriangleUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, hovered } = myData;
	const { events } = myFunctions;
	const { triangleRef, ball8Ref } = myRefs;

	const PoolBall8: Mesh = nodes["Ball8"] as Mesh;
	const Rack: Mesh = nodes["Rack"] as Mesh;

	return (
		<group name={name} ref={triangleRef} {...events}>
			<mesh ref={ball8Ref} geometry={PoolBall8.geometry} material={PoolBall8.material} position={PoolBall8.position} rotation={PoolBall8.rotation}></mesh>
			<mesh name="Rack" geometry={Rack.geometry} material={Rack.material} position={Rack.position} rotation={Rack.rotation}>
				<Outlines thickness={2} scale={hovered === "Rack" && selectObjectFocus?.name !== name ? 1 : 0} color={"white"} />
			</mesh>
		</group>
	);
};

export default memo(BillardTriangleUI);
