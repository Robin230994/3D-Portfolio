import { Center, useGLTF, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";
import { MutableRefObject, useRef } from "react";

import MaterialCreator from "../classes/MaterialCreator";
import useDebug from "../hooks/useDebug";
import LeftWall from "./LeftWall/LeftWall";
import FrontWall from "./FrontWall/FrontWall";
import WindowWall from "./WindowWall/WindowWall";
import BackWall from "./BackWall/BackWall";
import Floor from "./Floor/Floor";
import Roof from "./Roof/Roof";
import Window from "./Window/Window";
import WindowBorder from "./Window/WindowBorder";
import Filling from "./Filling/Filling";
import CoffeeCup from "./CoffeeCup/CoffeeCup";
import CoffeeCupHolder from "./CoffeeCup/CoffeeCupHolder";

type GLTFResult = {
	nodes: {
		[key: string]: Mesh | DirectionalLight; // Index signature for dynamic access
	};
};

const materialCreator = MaterialCreator.getInstance();

function Portfolio() {
	/** Nodes / Meshes */
	const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;
	const { Lights } = useDebug(materialCreator);

	const Sun = nodes["Sun"] as DirectionalLight;

	/** REFS */
	const sunlightRef = useRef<DirectionalLight | null>(null);
	useHelper(sunlightRef as MutableRefObject<DirectionalLight>, DirectionalLightHelper, 1, "red");

	return (
		<Center>
			<ambientLight intensity={Lights.AmbientLight.intensity} />
			<directionalLight
				intensity={Lights.SunLight.intensity}
				position={[Lights.SunLight.position.x, Lights.SunLight.position.y, Lights.SunLight.position.z]}
				rotation={[Lights.SunLight.rotation.x, Lights.SunLight.rotation.y, Lights.SunLight.rotation.z]}
				color={Sun.color}
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

					<Filling name="Filing" object={nodes["Filing"] as Mesh} />

					<CoffeeCup name="CoffeeCup" object={nodes["Cup"] as Mesh} />
					<CoffeeCupHolder name="CoffeeCupHolder" object={nodes["CupHolder"] as Mesh} />
				</group>
			</group>
		</Center>
	);
}

export default Portfolio;
