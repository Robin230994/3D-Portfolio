import { AdaptiveDpr, BakeShadows, CameraControls, Center, Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { GLTFResult } from "../types/GLTypes";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { useHoverContext } from "../hooks/useHoverContext";

import Foundation from "./Foundation/Foundation";
import Desks from "./Desks/Desks";
import CameraController from "./CameraController/CameraController";
import ObjectT1 from "./ObjectT1/ObjectT1";
import ObjectT2 from "./ObjectT2/ObjectT2";
import ObjectT3 from "./ObjectT3/ObjectT3";
import ObjectT4 from "./ObjectT4/ObjectT4";
import ImageObjectT1 from "./ImageObjectT1/ImageObjectT1";
import ImageObjectT2 from "./ImageObjectT2/ImageObjectT2";

function Portfolio({ isDebugMode }: { isDebugMode: boolean }) {
	const officeModel = useLoader(GLTFLoader, "./offiice-room-new.glb", (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./draco/");
		loader.setDRACOLoader(dracoLoader);
	});

	/** Nodes / Meshes */
	// const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;
	const { nodes, materials } = officeModel as unknown as GLTFResult;

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
			{perfParams.visible && <Perf position="top-left" />}

			{/** Scale pixel ratio based on performance */}
			<AdaptiveDpr pixelated />
			<CameraController isDebugMode={isDebugMode} ref={cameraControlsRef} />

			{/* bake shadows for performance */}
			<BakeShadows />

			<Environment
				background={true}
				files={"./environment/environment_map.hdr"}
				environmentIntensity={environmentIntensity}
				environmentRotation={[environmentRotation.x, environmentRotation.y, environmentRotation.z]}
			/>

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
						<Desks name="Desks" nodes={nodes} cameraControls={cameraControlsRef} />
						<ObjectT1 name="ObjectT1" nodes={nodes} />
						<ObjectT2 name="ObjectT2" nodes={nodes} />
						<ObjectT3 name="ObjectT3" nodes={nodes} />
						<ObjectT4 name="ObjectT4" nodes={nodes} />
					</group>

					<group name="image-objects">
						<ImageObjectT1 name="ImageObjectT1" nodes={nodes} />
						<ImageObjectT2 name="ImageObjectT2" nodes={nodes} />
					</group>

					{/* </Selection> */}
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
