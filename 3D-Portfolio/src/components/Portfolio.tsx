import { Center, Environment, useGLTF, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, Mesh, ACESFilmicToneMapping } from "three";
import { MutableRefObject, useRef } from "react";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { GLTFResult } from "../types/GLTypes";

import Window from "./Window/Window";
import Filing from "./Filling/Filing";
import Door from "./Door/Door";
import MainDesk from "./MainDesk/MainDesk";
import Foundation from "./Foundation/Foundation";

function Portfolio() {
	/** Nodes / Meshes */
	const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;

	/** REFS */
	const sunlightRef = useRef<DirectionalLight | null>(null);
	useHelper(sunlightRef as MutableRefObject<DirectionalLight>, DirectionalLightHelper, 1, "red");

	/** Debug */
	const perfParams = useControls("Perf", {
		visible: true,
	});

	const lightParams = useControls(
		"Lights",
		{
			AmbientLight: folder(
				{
					ambientLightIntensity: { value: 1.5, min: 1, max: 10, step: 0.1 },
				},
				{ collapsed: true }
			),
			SunLight: folder(
				{
					sunlightIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
					sunlightColor: "#ffffff",
					sunlightPosition: { value: { x: 15.6, y: 5.1, z: 2.6 }, step: 0.01, joystick: "invertY" },
					sunlightRotation: { value: { x: -0.8, y: 1.2, z: -2.8 }, joystick: "invertY" },
				},
				{ collapsed: true }
			),
		},
		{ collapsed: true }
	);

	return (
		<>
			{/* <EffectComposer>
				<ToneMapping mode={ACESFilmicToneMapping} />
			</EffectComposer> */}

			{perfParams.visible && <Perf position="top-left" />}

			<Environment background={false} preset="dawn" />

			<Center>
				<ambientLight intensity={lightParams.ambientLightIntensity} />
				<directionalLight
					intensity={lightParams.sunlightIntensity}
					position={[lightParams.sunlightPosition.x, lightParams.sunlightPosition.y, lightParams.sunlightPosition.z]}
					rotation={[lightParams.sunlightRotation.x, lightParams.sunlightRotation.y, lightParams.sunlightRotation.z]}
					color={lightParams.sunlightColor}
					castShadow
					ref={sunlightRef}
				/>

				{/************ Office Room ************/}
				<group name="office-room">
					{/************ BASE (Walls + Roof + Floor) ************/}
					<Foundation name="Foundation" nodes={nodes} />

					{/************ All objects inside the room ************/}
					<group name="objects">
						<Window name="Window" nodes={nodes} />
						<Filing name="Filing" nodes={nodes} />
						<Door name="Door" nodes={nodes} />
						<MainDesk name="MainDesk" nodes={nodes} />
					</group>
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
