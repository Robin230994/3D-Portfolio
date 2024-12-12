import { DoubleSide, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { metalMaterial } from "../../Helper/GLMaterials";

import MaterialCreator from "../../classes/MaterialCreator";

// const materialCreator = MaterialCreator.getInstance();

// const doorMaterial = materialCreator.createStandardMaterialFromTexture("DoorBase", {
//     diffuseT: "/baked-textures/"
// })

const Door: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Door: Mesh = nodes["DoorBase"] as Mesh;
	const DoorFrame: Mesh = nodes["DoorKnotFrame"] as Mesh;
	const DoorHandleFP: Mesh = nodes["DoorHandleFF"] as Mesh;
	const DoorHandleSP: Mesh = nodes["MainHandle"] as Mesh;

	return (
		<group name={name}>
			{/** Main Door */}
			<mesh name={name} geometry={Door.geometry} position={Door.position} rotation={Door.rotation}>
				<meshStandardMaterial color={"#7d5030"} side={DoubleSide} />
			</mesh>

			{/** Door Frame */}
			<mesh geometry={DoorFrame.geometry} position={DoorFrame.position} rotation={DoorFrame.rotation} material={metalMaterial} />

			{/** DoorHandle */}
			<mesh geometry={DoorHandleFP.geometry} position={DoorHandleFP.position} rotation={DoorHandleFP.rotation} material={metalMaterial} />
			<mesh geometry={DoorHandleSP.geometry} position={DoorHandleSP.position} rotation={DoorHandleSP.rotation} material={metalMaterial} />
		</group>
	);
};

export default Door;
