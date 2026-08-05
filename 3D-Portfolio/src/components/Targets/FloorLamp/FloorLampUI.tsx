import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Material, Mesh, PointLight } from "three";
import { Outlines } from "@react-three/drei";
import { useControls } from "leva";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";

interface FloorLampUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				lightOn: boolean;
				hovered: string | null;
				materials?: {
					t2Material?: Material;
				};
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
		refs: {
			myRefs: {
				lampLightRef: React.MutableRefObject<PointLight | null>;
			};
		};
	};
}

const FloorLampUI: React.FC<FloorLampUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, lightOn, hovered, materials } = myData;
	const { events } = myFunctions;
	const { lampLightRef } = myRefs;

	const t2Material = materials?.t2Material;
	const Lamp = nodes["lamp"] as Mesh;

	const { lightPos } = useControls("Floor Lamp", {
		lightPos: { value: { x: 1.85, y: 2.16, z: -2.4 } },
	});

	//useHelper(lampLightRef as React.MutableRefObject<PointLight>, PointLightHelper, 0.2, "yellow");

	return (
		<group {...events}>
			<mesh name={name} geometry={Lamp.geometry} position={Lamp.position} rotation={Lamp.rotation} material={t2Material}>
				<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
			</mesh>

			{/** point light bulp inside the lamp */}
			<pointLight ref={lampLightRef} visible={lightOn} position={[lightPos.x, lightPos.y, lightPos.z]} intensity={2} distance={5} decay={2} color="#FFD7A3" />
		</group>
	);
};

export default FloorLampUI;
