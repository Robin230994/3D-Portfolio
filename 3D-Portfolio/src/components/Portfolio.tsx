import { Center, useGLTF } from "@react-three/drei";
import { FolderSettings } from "leva/dist/declarations/src/types";
import { Mesh } from "three";
import { backWallMaterial, floorMaterial, frontWallMaterial, leftWallMaterial, windowWallMaterial } from "../Helper/materials";

import CustomMesh from "./CustomMesh/CustomMesh";
import MaterialCreator from "../classes/MaterialCreator";
import useDebug from "../hooks/useDebug";

type GLTFResult = {
	nodes: {
		[key: string]: Mesh; // Index signature for dynamic access
	};
};

const materialCreator = MaterialCreator.getInstance();

function Portfolio() {
	const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;
	const { Lights } = useDebug(materialCreator);

	return (
		<>
			<Center>
				<ambientLight intensity={Lights.AmbientLight.intensity} />
				{/************ Office Room ************/}
				<group name="office-room">
					{/************ BASE (Walls + Roof + Floor) ************/}
					<group name="base">
						<CustomMesh objectName="LeftWall" object={nodes["LeftWall"]} material={leftWallMaterial} />

						<CustomMesh objectName="WindowWall" object={nodes["WindowWall"]} material={windowWallMaterial} />

						<CustomMesh objectName="FrontWall" object={nodes["FrontWall"]} material={frontWallMaterial} />

						<CustomMesh objectName="BackWall" object={nodes["BackWall"]} material={backWallMaterial} />

						<CustomMesh objectName="Roof" object={nodes["Roof"]} />

						<CustomMesh objectName="Floor" object={nodes["Floor"]} material={floorMaterial} />
					</group>
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
