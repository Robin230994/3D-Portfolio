import { Center, Environment, useGLTF, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, Mesh, ACESFilmicToneMapping } from "three";
import { MutableRefObject, useRef } from "react";
import { folder, useControls } from "leva";
import { Perf } from "r3f-perf";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";

import LeftWall from "./LeftWall/LeftWall";
import FrontWall from "./FrontWall/FrontWall";
import WindowWall from "./WindowWall/WindowWall";
import BackWall from "./BackWall/BackWall";
import Floor from "./Floor/Floor";
import Roof from "./Roof/Roof";
import Window from "./Window/Window";
import WindowBorder from "./Window/WindowBorder";
import CoffeeCup from "./CoffeeCup/CoffeeCup";
import CoffeeCupHolder from "./CoffeeCup/CoffeeCupHolder";
import Filing from "./Filling/Filing";
import CoffeCupStand from "./CoffeeCup/CoffeeCupStand";
import Door from "./Door/Door";
import DoorHandle from "./Door/DoorHandle";

type GLTFResult = {
	nodes: {
		[key: string]: Mesh | DirectionalLight; // Index signature for dynamic access
	};
};

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
					<group name="base">
						<LeftWall name="LeftWall" object={nodes["LeftWall"] as Mesh} />

						<WindowWall name="WindowWall" object={nodes["WindowWall"] as Mesh} />

						<FrontWall name="FrontWall" object={nodes["FrontWall"] as Mesh} />

						<BackWall name="BackWall" object={nodes["BackWall"] as Mesh} />

						<Roof name="Roof" object={nodes["Roof"] as Mesh} />

						<Floor name="Floor" object={nodes["Floor"] as Mesh} />
					</group>

					{/************ All objects inside the room ************/}
					<group name="objects">
						<Window name="Window" object={nodes["WindowGlass"] as Mesh} />

						<WindowBorder name="WindowBorder" object={nodes["WindowBorder"] as Mesh} />

						<Filing name="Filing" object={nodes["Filing"] as Mesh} />

						{/** Coffee cup with holder and stand */}
						<group name="CoffeeCup">
							<CoffeeCup name="CoffeeCup" object={nodes["Cup"] as Mesh} />
							<CoffeeCupHolder name="CoffeeCupHolder" object={nodes["CupHolder"] as Mesh} />
							<CoffeCupStand name="CoffeeCupStand" object={nodes["CoffeCupStand"] as Mesh} />
						</group>

						{/** Door */}
						<group name="Door">
							<Door name="Door" object={nodes["DoorBase"] as Mesh} />
							<DoorHandle name="DoorHandleFF" object={nodes["DoorHandleFF"] as Mesh} />
							<DoorHandle name="DoorHandleMain" object={nodes["MainHandle"] as Mesh} />
						</group>
					</group>
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
