import React from "react";
import { IUIComponentProps } from "../../../utils/Types";
import { DirectionalLight, Material, Mesh, Object3D, SpotLight } from "three";
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
				lampLightRef: React.MutableRefObject<SpotLight | null>;
				lampTargetRef: React.MutableRefObject<Object3D | null>;
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
	const { lampLightRef, lampTargetRef } = myRefs;

	const t2Material = materials?.t2Material;
	const Lamp = nodes["lamp"] as Mesh;

	const { lightPos, lightTarget, lightIntensity, lightDistance, lightAngle, lightPenumbra, lightDecay } = useControls("Floor Lamp", {
		lightPos: { value: { x: 1.82, y: 2.19, z: -2.57 } },
		lightTarget: { value: { x: 1.8, y: 0.3, z: -2.6 }, step: 0.1 },
		lightIntensity: { value: 1.5, min: 0, max: 10, step: 0.1 },
		lightDistance: { value: 6.1, min: 0, max: 10, step: 0.1 },
		lightAngle: { value: 3.13, min: 0, max: 10, step: 0.01 },
		lightPenumbra: { value: 0.2, min: 0, max: 1, step: 0.01 },
		lightDecay: { value: 0.2, min: 0, max: 10, step: 0.1 },
	});

	return (
		<group {...events}>
			<mesh name={name} geometry={Lamp.geometry} position={Lamp.position} rotation={Lamp.rotation} material={t2Material}>
				<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
			</mesh>

			<object3D ref={lampTargetRef} position={[lightTarget.x, lightTarget.y, lightTarget.z]} />
			<spotLight
				ref={lampLightRef}
				position={[lightPos.x, lightPos.y, lightPos.z]}
				intensity={lightIntensity}
				distance={lightDistance}
				angle={lightAngle}
				penumbra={lightPenumbra}
				decay={lightDecay}
				color="#FFD7A3"
				visible={lightOn}
			/>
		</group>
	);
};

export default FloorLampUI;
