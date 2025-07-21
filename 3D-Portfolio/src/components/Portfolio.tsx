import { AdaptiveDpr, BakeShadows, CameraControls, Center, Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { GLTFResult } from "../types/GLTypes";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { useHoverContext } from "../hooks/useHoverContext";

import Window from "./Window/Window";
import Filing from "./Filling/Filing";
import Door from "./Door/Door";
import Foundation from "./Foundation/Foundation";
import RoofLamp from "./RoofLamp/RoofLamp";
import FloorLamp from "./FloorLamp/FloorLamp";
import Desks from "./Desks/Desks";
import OfficeChair from "./OfficeChair/OfficeChair";
import CameraController from "./CameraController/CameraController";

function Portfolio({ isDebugMode }: { isDebugMode: boolean }) {
	const officeModel = useLoader(GLTFLoader, "./offiice-room.glb", (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./draco/");
		loader.setDRACOLoader(dracoLoader);
	});

	/** Nodes / Meshes */
	// const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;
	const { nodes } = officeModel as unknown as GLTFResult;

	/** STATES */

	/** REFS */
	const cameraControlsRef = useRef<CameraControls>(null);

	/** HOOKS */

	/** Contexts */
	const { isAnyHovered } = useHoverContext();

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
		},
		{ collapsed: true }
	);

	const { environmentIntensity, environmentRotation } = useControls("Environment", {
		environmentIntensity: { value: 1.4, step: 0.1, min: 1 },
		environmentRotation: { value: { x: 0.11, y: 1.2, z: -2.8 }, step: 0.01 },
	});

	useEffect(() => {
		const switchCursorStyle = () => {
			if (isAnyHovered === true) {
				document.body.style.cursor = "pointer";
			} else {
				document.body.style.cursor = "default";
			}
		};
		switchCursorStyle();
	}, [isAnyHovered]);

	return (
		<>
			{/** Scale pixel ratio based on performance */}
			<AdaptiveDpr pixelated />
			{isDebugMode ? <OrbitControls /> : <CameraController isDebugMode={isDebugMode} ref={cameraControlsRef} />}

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
				{/************ Office Room ************/}
				<group name="office-room">
					{/************ BASE (Walls + Roof + Floor) ************/}
					<Foundation name="Foundation" nodes={nodes} />

					{/************ All objects inside the room ************/}
					{/* <Selection> */}
					{/* <EffectComposer multisampling={0} autoClear={false}>
							<Outline blur={false} visibleEdgeColor={0xff0000} edgeStrength={2} width={window.devicePixelRatio < 2 ? 512 : 1024} />
						</EffectComposer> */}
					<group name="objects">
						<RoofLamp name="RoofLamp" nodes={nodes} />
						<FloorLamp name="FloorLamp" nodes={nodes} />
						<Window name="Window" nodes={nodes} />
						<Filing name="Filing" nodes={nodes} />
						<Door name="Door" nodes={nodes} />
						<Desks name="Desks" nodes={nodes} cameraControls={cameraControlsRef} />
						<OfficeChair name="OfficeChair" nodes={nodes} />
					</group>
					{/* </Selection> */}
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
