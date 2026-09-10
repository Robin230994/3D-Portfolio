import { AdaptiveDpr, Center, Environment, useHelper } from "@react-three/drei";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { GLTFResult } from "../types/GLTypes";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

import Foundation from "./Foundation/Foundation";
import Desks from "./Desks/Desks";
import CameraController from "./CameraController/CameraController";
import ObjectT1 from "./ObjectT1/ObjectT1";
import ObjectT2 from "./ObjectT2/ObjectT2";
import ObjectT3 from "./ObjectT3/ObjectT3";
import ObjectT4 from "./ObjectT4/ObjectT4";
import ObjectT5 from "./ObjectT5/ObjectT5";
import ImageObjectT1 from "./ImageObjectT1/ImageObjectT1";
import ImageObjectT2 from "./ImageObjectT2/ImageObjectT2";
import useCursorEffect from "../hooks/useCursorEffect";
import Robbi from "./Targets/Robbi/Robbi";
import ObjectT6 from "./ObjectT6/ObjectT6";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper } from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function Portfolio({ isDebugMode }: { isDebugMode: boolean }) {
	// const directionalLightRef = useRef<DirectionalLight>(null!);
	// useHelper(directionalLightRef, DirectionalLightHelper, 1, "#00ffff");

	const officeModel = useLoader(GLTFLoader, "./offiice-room3.glb", (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./draco/");
		loader.setDRACOLoader(dracoLoader);
	});

	/** Nodes / Meshes */
	const { nodes, animations, materials } = officeModel as unknown as GLTFResult;

	/** STATES */

	/** REFS */

	/** HOOKS */
	useCursorEffect();

	/** Debug */
	const perfParams = useControls("Perf", {
		visible: true,
	});

	const lightParams = useControls(
		"Lights",
		{
			AmbientLight: folder(
				{
					// ambientLightIntensity: { value: 0.55, min: 0, max: 10, step: 0.01 },
					ambientLightIntensity: { value: 0.22, min: 0, max: 10, step: 0.01 },
				},
				{ collapsed: false },
			),

			DirectionalLight: folder({
				directionalIntensity: {
					value: 1,
					min: 0,
					max: 10,
					step: 0.1,
				},

				directionalPosition: {
					value: { x: 15, y: 2, z: 0.3 },
					step: 0.1,
				},

				directionalColor: {
					value: "#fff5e6",
				},
			}),
		},
		{ collapsed: true },
	);

	const { environmentIntensity, environmentRotation } = useControls("Environment", {
		// environmentIntensity: { value: 1.4, step: 0.1, min: 0.1 },
		environmentIntensity: { value: 0.9, step: 0.1, min: 0.1 },
		environmentRotation: { value: { x: 0.11, y: 1.2, z: -2.8 }, step: 0.01 },
	});

	return (
		<>
			{isDebugMode && perfParams.visible && <Perf position="top-left" />}

			{/** Scale pixel ratio based on performance */}
			<AdaptiveDpr pixelated />
			<Environment
				background={true}
				files={"./environment/environment_map.hdr"}
				environmentIntensity={environmentIntensity}
				environmentRotation={[environmentRotation.x, environmentRotation.y, environmentRotation.z]}
			/>

			<EffectComposer multisampling={0}>
				<Bloom luminanceThreshold={1.1} luminanceSmoothing={0} intensity={0.45} mipmapBlur={false} />
			</EffectComposer>

			<Center>
				<CameraController isDebugMode={isDebugMode} />

				<ambientLight intensity={lightParams.ambientLightIntensity} />
				<directionalLight
					// ref={directionalLightRef}
					intensity={lightParams.directionalIntensity}
					color={lightParams.directionalColor}
					position={[lightParams.directionalPosition.x, lightParams.directionalPosition.y, lightParams.directionalPosition.z]}
				/>

				<group name="office-room">
					{/************ BASE (Walls + Roof + Floor) ************/}
					<Foundation name="Foundation" nodes={nodes} />

					{/************ All objects inside the room ************/}
					<group name="objects">
						<Desks name="Desks" nodes={nodes} />
						<ObjectT1 name="ObjectT1" nodes={nodes} />
						<ObjectT2 name="ObjectT2" nodes={nodes} />
						<ObjectT3 name="ObjectT3" nodes={nodes} />
						<ObjectT4 name="ObjectT4" nodes={nodes} />
						<ObjectT5 name="ObjectT5" nodes={nodes} animations={animations} />
						<ObjectT6 name="ObjectT6" nodes={nodes} />
						<Robbi name="Robbi" nodes={nodes} materials={materials} animations={animations} />
					</group>

					<group name="image-objects">
						<ImageObjectT1 name="ImageObjectT1" nodes={nodes} animations={animations} />
						<ImageObjectT2 name="ImageObjectT2" nodes={nodes} animations={animations} />
					</group>
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
