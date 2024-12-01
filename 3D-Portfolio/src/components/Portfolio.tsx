import { useGLTF } from "@react-three/drei";

import CustomMesh from "./CustomMesh/CustomMesh";
import * as THREE from "three";

type GLTFResult = {
	nodes: {
		[key: string]: THREE.Mesh; // Index signature for dynamic access
	};
};

function Portfolio() {
	const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;

	return (
		<>
			{/************ Office Room ************/}
			<group name="office-room">
				{/************ BASE (Walls + Roof + Floor) ************/}
				<group name="base">
					<CustomMesh objectName="LeftWall" object={nodes["LeftWall"]} />

					<CustomMesh objectName="WindowWall" object={nodes["WindowWall"]} />

					<CustomMesh objectName="FrontWall" object={nodes["FrontWall"]} />

					<CustomMesh objectName="BackWall" object={nodes["BackWall"]} />

					<CustomMesh objectName="Roof" object={nodes["Roof"]} />

					<CustomMesh objectName="Floor" object={nodes["Floor"]} />
				</group>
			</group>
		</>
	);
}

export default Portfolio;
