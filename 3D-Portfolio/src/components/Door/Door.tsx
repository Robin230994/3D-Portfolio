import { DoubleSide, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { metalMaterial } from "../../Helper/GLMaterials";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const doorMaterial = materialCreator.createStandardMaterialFromTexture("DoorBase", {
	diffuseT: "/baked-textures/Door/oak_veneer_01_diff_4k.jpg",
	roughnessT: "/baked-textures/Door/oak_veneer_01_arm_4k.jpg",
	aoT: "/baked-textures/Door/oak_veneer_01_arm_4k.jpg",
});
doorMaterial.side = DoubleSide;

const Door: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Door: Mesh = nodes["DoorBase"] as Mesh;
	const DoorHandleSP: Mesh = nodes["MainHandle"] as Mesh;

	return (
		<group name={name}>
			{/** Main Door */}
			<mesh name={name} geometry={Door.geometry} position={Door.position} rotation={Door.rotation} material={doorMaterial} />

			{/** DoorHandle */}
			<mesh geometry={DoorHandleSP.geometry} position={DoorHandleSP.position} rotation={DoorHandleSP.rotation} material={metalMaterial} />
		</group>
	);
};

export default Door;
