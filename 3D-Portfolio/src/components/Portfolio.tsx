import { Center, useGLTF, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";
import { backWallMaterial, floorMaterial, frontWallMaterial, leftWallMaterial, windowWallMaterial } from "../Helper/materials";

import CustomMesh from "./CustomMesh/CustomMesh";
import MaterialCreator from "../classes/MaterialCreator";
import useDebug from "../hooks/useDebug";
import { MutableRefObject, useRef } from "react";

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
		<>
			<Center>
				<ambientLight intensity={Lights.AmbientLight.intensity} />
				<directionalLight intensity={1} position={Sun.position} rotation={Sun.rotation} color={Sun.color} ref={sunlightRef} />
				{/************ Office Room ************/}
				<group name="office-room">
					{/************ BASE (Walls + Roof + Floor) ************/}
					<group name="base">
						<CustomMesh objectName="LeftWall" object={nodes["LeftWall"] as Mesh} material={leftWallMaterial} />

						<CustomMesh objectName="WindowWall" object={nodes["WindowWall"] as Mesh} material={windowWallMaterial} />

						<CustomMesh objectName="FrontWall" object={nodes["FrontWall"] as Mesh} material={frontWallMaterial} />

						<CustomMesh objectName="BackWall" object={nodes["BackWall"] as Mesh} material={backWallMaterial} />

						<CustomMesh objectName="Roof" object={nodes["Roof"] as Mesh} />

						<CustomMesh objectName="Floor" object={nodes["Floor"] as Mesh} material={floorMaterial} />
					</group>
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
