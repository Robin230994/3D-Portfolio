import { AdaptiveDpr, Center, Environment, OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, ACESFilmicToneMapping } from "three";
import { PerspectiveCamera as THREEPerspectiveCamera } from "three";
import { MutableRefObject, useRef } from "react";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { GLTFResult } from "../types/GLTypes";
import { useLoader, useThree } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

import Window from "./Window/Window";
import Filing from "./Filling/Filing";
import Door from "./Door/Door";
import Foundation from "./Foundation/Foundation";
import RoofLamp from "./RoofLamp/RoofLamp";
import FloorLamp from "./FloorLamp/FloorLamp";
import Desks from "./Desks/Desks";
import OfficeChair from "./OfficeChair/OfficeChair";

function Portfolio() {
	// Use regression to optimize performance
	const regress = useThree((state) => state.performance.regress);

	const officeModel = useLoader(GLTFLoader, "./office-room.glb", (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./draco/");
		loader.setDRACOLoader(dracoLoader);
	});

	/** Nodes / Meshes */
	// const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;
	const { nodes } = officeModel as unknown as GLTFResult;

	/** REFS */
	const sunlightRef = useRef<DirectionalLight | null>(null);
	useHelper(sunlightRef as MutableRefObject<DirectionalLight>, DirectionalLightHelper, 1, "red");

	const cameraRef = useRef<THREEPerspectiveCamera>(null);
	// useHelper(cameraRef as MutableRefObject<THREEPerspectiveCamera>, CameraHelper);

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
			{/* <PerformanceMonitor onDecline={() => console.log("Performance dropped!")} onIncline={() => console.log("Performance improved")} /> */}
			{/** Scale pixel ratio based on performance */}
			<AdaptiveDpr pixelated />

			<OrbitControls regress />
			<PerspectiveCamera ref={cameraRef} fov={18} near={0.1} far={20} position={[-6, 0, -0.4]} rotation={[0, -1.6, 0]} />

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
						<RoofLamp name="RoofLamp" nodes={nodes} />
						<FloorLamp name="FloorLamp" nodes={nodes} />
						<Window name="Window" nodes={nodes} />
						<Filing name="Filing" nodes={nodes} />
						<Door name="Door" nodes={nodes} />
						<Desks name="Desks" nodes={nodes} />
						<OfficeChair name="OfficeChair" nodes={nodes} />
					</group>
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
