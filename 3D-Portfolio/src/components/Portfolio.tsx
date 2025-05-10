import { AdaptiveDpr, BakeShadows, Center, Environment, OrbitControls, OrthographicCamera, PerspectiveCamera, useGLTF, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, ACESFilmicToneMapping, CameraHelper, OrthographicCamera as THREEOrthographicCamera } from "three";
import { PerspectiveCamera as THREEPerspectiveCamera } from "three";
import { MutableRefObject, useContext, useRef, useState } from "react";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { EffectComposer, Outline, Selection, Select, ToneMapping } from "@react-three/postprocessing";
import { GLTFResult } from "../types/GLTypes";
import { useFrame, useLoader } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

import Window from "./Window/Window";
import Filing from "./Filling/Filing";
import Door from "./Door/Door";
import Foundation from "./Foundation/Foundation";
import RoofLamp from "./RoofLamp/RoofLamp";
import FloorLamp from "./FloorLamp/FloorLamp";
import Desks from "./Desks/Desks";
import OfficeChair from "./OfficeChair/OfficeChair";
import { useHoverContext } from "../Helper/Context/SelectHoverObjectContext";

function Portfolio() {
	const officeModel = useLoader(GLTFLoader, "./office-room.glb", (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./draco/");
		loader.setDRACOLoader(dracoLoader);
	});

	/** Nodes / Meshes */
	// const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;
	const { nodes } = officeModel as unknown as GLTFResult;

	/** CONTEXT */
	const { selectObjectHovered } = useHoverContext();

	/** REFS */
	const sunlightRef = useRef<DirectionalLight | null>(null);
	useHelper(sunlightRef as MutableRefObject<DirectionalLight>, DirectionalLightHelper, 1, "red");

	const sunlightShadow = useRef<THREEOrthographicCamera | null>(null);
	useHelper(sunlightShadow as MutableRefObject<THREEOrthographicCamera>, CameraHelper);

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
					ambientLightIntensity: { value: 1, min: 1, max: 10, step: 0.1 },
				},
				{ collapsed: true }
			),
			SunLight: folder(
				{
					sunlightIntensity: { value: 1.2, min: 0, max: 10, step: 0.1 },
					sunlightColor: "##efd7af",
					sunlightPosition: { value: { x: 10, y: 5, z: 0 }, step: 0.1, joystick: "invertY" },
					sunlightRotation: { value: { x: -0.8, y: 1.5, z: -2.8 }, step: 0.1, joystick: "invertY" },
					shadowNear: { value: 0.1, min: 0.1, step: 0.1 },
					shadowFar: { value: 500, min: 0.1, step: 10 },
				},
				{ collapsed: true }
			),
		},
		{ collapsed: true }
	);

	const { environmentIntensity, environmentRotation } = useControls("Envrionment", {
		environmentIntensity: { value: 1.4, step: 0.1, min: 1 },
		environmentRotation: { value: { x: 0.11, y: 1.2, z: -2.8 }, step: 0.01 },
	});

	return (
		<>
			{/** Scale pixel ratio based on performance */}
			<AdaptiveDpr pixelated />
			<OrbitControls regress />
			{/* <PerspectiveCamera ref={cameraRef} fov={18} near={0.1} far={20} position={[-6, 0, -0.4]} rotation={[0, -1.6, 0]} makeDefault /> */}

			{/* <EffectComposer>
				<ToneMapping mode={ACESFilmicToneMapping} />
			</EffectComposer> */}

			{perfParams.visible && <Perf position="top-left" />}

			<Environment
				background={true}
				files={"./environment/environment_map.hdr"}
				environmentIntensity={environmentIntensity}
				environmentRotation={[environmentRotation.x, environmentRotation.y, environmentRotation.z]}
			/>

			{/* bake shadows for performance */}
			<BakeShadows />

			<Center>
				<ambientLight intensity={lightParams.ambientLightIntensity} />
				<directionalLight
					intensity={lightParams.sunlightIntensity}
					position={[lightParams.sunlightPosition.x, lightParams.sunlightPosition.y, lightParams.sunlightPosition.z]}
					rotation={[lightParams.sunlightRotation.x, lightParams.sunlightRotation.y, lightParams.sunlightRotation.z]}
					color={lightParams.sunlightColor}
					ref={sunlightRef}
					castShadow
					shadow-mapSize={[1024, 1024]}>
					<orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 25]} ref={sunlightShadow} />
				</directionalLight>

				{/************ Office Room ************/}
				<group name="office-room">
					{/************ BASE (Walls + Roof + Floor) ************/}
					<Foundation name="Foundation" nodes={nodes} />

					{/************ All objects inside the room ************/}
					<Selection>
						<EffectComposer multisampling={8} autoClear={false}>
							<Outline blur visibleEdgeColor={0xffffff} edgeStrength={0.8} />
						</EffectComposer>
						<group name="objects">
							<RoofLamp name="RoofLamp" nodes={nodes} />
							<FloorLamp name="FloorLamp" nodes={nodes} />
							<Window name="Window" nodes={nodes} />
							<Filing name="Filing" nodes={nodes} />
							<Door name="Door" nodes={nodes} />
							<Desks name="Desks" nodes={nodes} />
							<OfficeChair name="OfficeChair" nodes={nodes} />
						</group>
					</Selection>
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
