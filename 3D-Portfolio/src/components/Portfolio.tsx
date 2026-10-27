import { AdaptiveDpr, Center, Environment, useGLTF } from "@react-three/drei";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { GLTFResult, LoadingState } from "../utils/Types";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader, RectAreaLightUniformsLib } from "three/examples/jsm/Addons.js";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { memo, useCallback, useRef, useState } from "react";
import { DirectionalLight, RectAreaLight, Vector3 } from "three";

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
import Robbi from "./Targets/Robbi/Robbi";
import ObjectT6 from "./ObjectT6/ObjectT6";
import Outside from "./Outside/Outside";
import ObjectT7 from "./ObjectT7/ObjectT7";
import GodRays from "./GodRays/GodRays";
import ObjectT8 from "./ObjectT8/ObjectT8";
import AutoPerformance from "./AutoPerformance/AutoPerformance";

RectAreaLightUniformsLib.init();

function Portfolio({ loadingState, isDebugMode }: { loadingState: LoadingState; isDebugMode: boolean }) {
	const officeModel = useLoader(GLTFLoader, "./offiice-room3.glb", (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./draco/");
		loader.setDRACOLoader(dracoLoader);
	});

	/** Nodes / Meshes */
	const { nodes, animations, materials } = officeModel as unknown as GLTFResult;

	/** STATES */
	const [outsideOffset, setOutsideOffset] = useState<[number, number, number]>([0, 0, 0]);

	/** REFS */
	const directionalLightRef = useRef<DirectionalLight>(null!);

	const ceilingLightRef = useRef<RectAreaLight>(null!);

	/** HOOKS */

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
					ambientLightIntensity: { value: 1, min: 0, max: 10, step: 0.01 },
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
					// value: { x: 15, y: 2, z: 0.3 },
					value: { x: 12, y: 2, z: -1.6 },
					step: 0.1,
				},

				directionalColor: {
					value: "#fff5e6",
				},
			}),

			RectAreaLight: folder({
				rectAreaLightIntensity: {
					value: 7.0,
					min: 0,
					max: 10,
					step: 0.1,
				},

				rectAreaLightPosition: {
					value: { x: 0, y: 4.3, z: 0 },
					step: 0.1,
				},

				rectAreaLightRotation: {
					value: { x: -Math.PI / 2, y: 0, z: 0 },
					step: 0.1,
				},

				rectAreaLightWidth: {
					value: 2.4,
					min: 0,
					max: 10,
					step: 0.1,
				},

				rectAreaLightHeight: {
					value: 0.7,
					min: 0,
					max: 10,
					step: 0.1,
				},

				rectAreaLightColor: {
					value: "#ffffff",
				},
			}),
		},
		{ collapsed: false },
	);

	const { environmentIntensity, environmentRotation } = useControls("Environment", {
		environmentIntensity: { value: 0.4, step: 0.1, min: 0.1 },
		environmentRotation: { value: { x: 11.5, y: 2, z: -1.6 }, step: 0.01 },
	});

	const alignOutsideToRoom = useCallback(
		({
			center,
			horizontalAlignment,
			verticalAlignment,
			depthAlignment,
		}: {
			center: Vector3;
			horizontalAlignment: number;
			verticalAlignment: number;
			depthAlignment: number;
		}) => {
			setOutsideOffset([-center.x + horizontalAlignment, -center.y + verticalAlignment, -center.z + depthAlignment]);
		},
		[],
	);

	return (
		<>
			{isDebugMode && perfParams.visible && <Perf position="top-left" />}

			{/** Scale pixel ratio based on performance */}
			<AutoPerformance />
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

			<Center onCentered={alignOutsideToRoom}>
				<CameraController isDebugMode={isDebugMode} />

				<group name="lights">
					<ambientLight intensity={lightParams.ambientLightIntensity} />
					<directionalLight
						ref={directionalLightRef}
						intensity={lightParams.directionalIntensity}
						color={lightParams.directionalColor}
						position={[lightParams.directionalPosition.x, lightParams.directionalPosition.y, lightParams.directionalPosition.z]}
					/>
					{/** Rect Area Light */}
					<rectAreaLight
						ref={ceilingLightRef}
						position={[lightParams.rectAreaLightPosition.x, lightParams.rectAreaLightPosition.y, lightParams.rectAreaLightPosition.z]}
						rotation={[lightParams.rectAreaLightRotation.x, lightParams.rectAreaLightRotation.y, lightParams.rectAreaLightRotation.z]}
						width={lightParams.rectAreaLightWidth}
						height={lightParams.rectAreaLightHeight}
						intensity={lightParams.rectAreaLightIntensity}
					/>
				</group>

				<group name="office-room">
					{/************ BASE (Walls + Roof + Floor) ************/}
					<Foundation name="Foundation" nodes={nodes} />

					{/************ All objects inside the room ************/}
					<group name="objects">
						<Desks name="Desks" nodes={nodes} />
						<ObjectT1 name="ObjectT1" nodes={nodes} />
						<ObjectT2 name="ObjectT2" nodes={nodes} />
						<ObjectT3 name="ObjectT3" nodes={nodes} animations={animations} />
						<ObjectT4 name="ObjectT4" nodes={nodes} />
						<ObjectT5 name="ObjectT5" nodes={nodes} animations={animations} />
						<ObjectT6 name="ObjectT6" nodes={nodes} />
						<ObjectT7 name="ObjectT7" nodes={nodes} />
						<ObjectT8 name="ObjectT8" nodes={nodes} />
						<Robbi name="Robbi" nodes={nodes} materials={materials} animations={animations} />
					</group>

					<group name="image-objects">
						<ImageObjectT1 name="ImageObjectT1" nodes={nodes} animations={animations} />
						<ImageObjectT2 name="ImageObjectT2" nodes={nodes} animations={animations} />
					</group>
				</group>
			</Center>
			<group position={outsideOffset}>
				<GodRays name="GodRays" nodes={nodes} />
				<Outside name="Outside" nodes={nodes} />
			</group>
		</>
	);
}

export default memo(Portfolio);
useGLTF.preload("./offiice-room3.glb");
