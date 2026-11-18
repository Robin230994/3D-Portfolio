import { AdaptiveDpr, Center, Environment, useGLTF, useHelper } from "@react-three/drei";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { GLTFResult, LoadingState } from "../utils/Types";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader, RectAreaLightUniformsLib } from "three/examples/jsm/Addons.js";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { DirectionalLight, DirectionalLightHelper, Object3D, RectAreaLight, Vector3 } from "three";

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
import { ToneMappingMode } from "postprocessing";

RectAreaLightUniformsLib.init();

function Portfolio({ loadingState, isDebugMode, onWorldRevealEnd }: { loadingState: LoadingState; isDebugMode: boolean; onWorldRevealEnd: () => void }) {
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
	useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 0xff0000);

	const sunTargetRef = useRef<Object3D>(null!);

	useEffect(() => {
		if (directionalLightRef.current && sunTargetRef.current) {
			directionalLightRef.current.target = sunTargetRef.current;
		}
	}, []);

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
					ambientLightIntensity: { value: 0.18, min: 0, max: 10, step: 0.01 },
				},
				{ collapsed: false },
			),

			HemisPhereLight: folder({
				hemisphereSkyColor: { value: "#DCE6EE" },
				hemisphereGroundColor: { value: "#625E59" },
				hemisphereIntensity: { value: 0.42, step: 0.01 },
			}),

			DirectionalLight: folder({
				directionalIntensity: {
					value: 2.2,
					min: 0,
					max: 10,
					step: 0.1,
				},

				directionalPosition: {
					// Outside and above the window on the room's right-hand wall.
					value: { x: 10.5, y: 6, z: -0.2 },
					step: 0.1,
				},

				directionalTarget: {
					value: { x: 1.5, y: 1.2, z: 0 },
					step: 0.1,
				},

				directionalColor: {
					value: "#FFF0D8",
				},
			}),

			WindowFill: folder({
				windowFillPos: { value: { x: 7.72, y: 2.15, z: -0.04 }, step: 0.01 },
				windowFillIntensity: { value: 6.5, min: 0, max: 30, step: 0.1 },
				windowFillColor: { value: "#fff0d8" },
			}),
		},
		{ collapsed: false },
	);

	const { environmentIntensity, environmentRotation } = useControls("Environment", {
		environmentIntensity: { value: 0.38, step: 0.05, min: 0.01 },
		environmentRotation: { value: { x: 0, y: 0, z: 0 }, step: 0.01 },
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
				files={"./environment/sisulu_2k.hdr"}
				environmentIntensity={environmentIntensity}
				environmentRotation={[environmentRotation.x, environmentRotation.y, environmentRotation.z]}
				backgroundRotation={[environmentRotation.x, environmentRotation.y, environmentRotation.z]}
			/>

			<EffectComposer multisampling={0} depthBuffer>
				<Bloom luminanceThreshold={1.2} luminanceSmoothing={0} intensity={0.35} mipmapBlur={true} />
				<ToneMapping mode={ToneMappingMode.REINHARD} />
			</EffectComposer>

			{/* {loadingState === "Revealing" && <WorldReveal />} */}

			<Center onCentered={alignOutsideToRoom}>
				<CameraController isDebugMode={isDebugMode} />

				<group name="lights">
					<ambientLight color="#F4F3EF" intensity={lightParams.ambientLightIntensity} />
					<directionalLight
						ref={directionalLightRef}
						intensity={lightParams.directionalIntensity}
						color={lightParams.directionalColor}
						position={[lightParams.directionalPosition.x, lightParams.directionalPosition.y, lightParams.directionalPosition.z]}
						castShadow
						shadow-mapSize-width={2048}
						shadow-mapSize-height={2048}
						shadow-bias={-0.00015}
					/>
					<object3D ref={sunTargetRef} position={[lightParams.directionalTarget.x, lightParams.directionalTarget.y, lightParams.directionalTarget.z]} />
					<hemisphereLight args={[lightParams.hemisphereSkyColor, lightParams.hemisphereGroundColor, lightParams.hemisphereIntensity]} />

					{/* Soft daylight entering from the rear/right-side window. */}
					<rectAreaLight
						position={[lightParams.windowFillPos.x, lightParams.windowFillPos.y, lightParams.windowFillPos.z]}
						rotation={[0, Math.PI / 2, 0]}
						width={1.6}
						height={2.1}
						intensity={lightParams.windowFillIntensity}
						color={lightParams.windowFillColor}
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
