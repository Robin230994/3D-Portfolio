import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { BufferGeometry, Material, NormalBufferAttributes, Object3DEventMap } from "three";

interface ClockUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
			};
		};
		functions: {
			myFunctions: object;
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
	const { myRefs } = props.refs;

	const { name, nodes } = myData;
	const { minuteRef, hourRef } = myRefs;
	const MinuteHand = nodes["MinuteHand"] as Mesh;
	const HourHand = nodes["HourHand"] as Mesh;

	return (
		<group name={name}>
			<mesh
				ref={minuteRef}
				geometry={MinuteHand.geometry}
				position={MinuteHand.position}
				rotation={MinuteHand.rotation}
				material={MinuteHand.material}
				scale={MinuteHand.scale}></mesh>
			<mesh
				ref={hourRef}
				geometry={HourHand.geometry}
				position={HourHand.position}
				rotation={HourHand.rotation}
				material={HourHand.material}
				scale={HourHand.scale}
			/>
		</group>
	);
};

export default ClockUI;
