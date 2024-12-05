import { Center, useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, Mesh } from "three";

import CustomMesh from "./CustomMesh/CustomMesh";
import MaterialCreator from "../classes/MaterialCreator";

type GLTFResult = {
	nodes: {
		[key: string]: Mesh; // Index signature for dynamic access
	};
};

const materialCreator = MaterialCreator.getInstance();
const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterial("FloorMat", {
	diffuseT: "/baked-textures/Floor/floor_baked_color.jpg",
	roughnessT: "/baked-textures/Floor/floor_baked_roughness.jpg",
	normalT: "/baked-textures/Floor/floor_baked_normal.png",
});

function Portfolio() {
	const { nodes } = useGLTF("./office-room.glb") as unknown as GLTFResult;

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
