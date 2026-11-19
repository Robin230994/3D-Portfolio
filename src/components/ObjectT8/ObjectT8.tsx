import { FC, useRef } from "react";
import { CustomMeshProps } from "../../utils/Interfaces";
import { Mesh, PointLight } from "three";
import { folder, useControls } from "leva";

const ObjectT8: FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT8 = nodes["object_t7"] as Mesh;
	const LED_Floor_Light = nodes["LED_Lamp_Lighting"] as Mesh;

	const pointLightRef = useRef<PointLight>(null!);

	const { LED_pointLightPos, LED_pointLightIntensity, LED_pointLightDistance, LED_pointLightDecay } = useControls("Lights", {
		LED_Lamp: folder(
			{
				LED_pointLightPos: { value: { x: 6.5, y: 1.8, z: 2.6 }, step: 0.1 },
				LED_pointLightIntensity: { value: 4.8, step: 0.1 },
				LED_pointLightDistance: { value: 2.8, step: 0.1 },
				LED_pointLightDecay: { value: 2.6, step: 0.1 },
			},
			{ collapsed: true },
		),
	});

	return (
		<group name={name}>
			<mesh geometry={ObjectT8.geometry} position={ObjectT8.position} rotation={ObjectT8.rotation} scale={ObjectT8.scale} material={ObjectT8.material} />
			<mesh geometry={LED_Floor_Light.geometry} position={LED_Floor_Light.position} scale={LED_Floor_Light.scale}>
				<meshStandardMaterial color={"#FFD7AD"} emissive={"#f4ac5a"} emissiveIntensity={10} />
			</mesh>

			{/** create a point light to have some better lighting from the LED lamp */}
			<pointLight
				ref={pointLightRef}
				color={"#f4ac5a"}
				position={[LED_pointLightPos.x, LED_pointLightPos.y, LED_pointLightPos.z]}
				distance={LED_pointLightDistance}
				decay={LED_pointLightDecay}
				intensity={LED_pointLightIntensity}
			/>
		</group>
	);
};

export default ObjectT8;
