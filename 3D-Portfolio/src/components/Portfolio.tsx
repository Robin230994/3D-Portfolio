import { Center, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { floorMaterial } from "../Helper/materials";

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
	useDebug(materialCreator);

	return (
		<>
			<Center>
				<ambientLight intensity={1.5} />
				{/************ Office Room ************/}
				<group name="office-room">
					{/************ BASE (Walls + Roof + Floor) ************/}
					<group name="base">
						<CustomMesh objectName="LeftWall" object={nodes["LeftWall"]} />

						<CustomMesh objectName="WindowWall" object={nodes["WindowWall"]} />

						<CustomMesh objectName="FrontWall" object={nodes["FrontWall"]} />

						<CustomMesh objectName="BackWall" object={nodes["BackWall"]} />

						<CustomMesh objectName="Roof" object={nodes["Roof"]} />

						<CustomMesh objectName="Floor" object={nodes["Floor"]} material={floorMaterial} />
					</group>
				</group>
			</Center>
		</>
	);
}

export default Portfolio;
