import { Mesh, MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const wallMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Walls", {
	diffuseT: "/baked-textures/Walls/Combined/walls_baked.jpg",
	normalT: "/baked-textures/Walls/Combined/walls_baked_normal.png",
});

const roofMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Roof", {
	diffuseT: "/baked-textures/Roof/roof_lighting_baked.jpg",
	roughnessT: "/baked-textures/Roof/roof_baked_roughness.jpg",
	normalT: "/baked-textures/Roof/roof_baked_normal.png",
});
// darken texture a bit so the diffuse color is not to bright
roofMaterial.color.setRGB(0.3, 0.3, 0.3);

const floorMaterial: MeshStandardMaterial = materialCreator.createStandardMaterialFromTexture("Floor", {
	diffuseT: "/baked-textures/Floor/floor_bottom_baked.jpg",
	roughnessT: "/baked-textures/Floor/floor_baked_roughness.webp",
	normalT: "/baked-textures/Floor/floor_baked_normal.png",
});

const Foundation: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Walls: Mesh = nodes["Walls"] as Mesh;
	const Roof: Mesh = nodes["Roof"] as Mesh;
	const Floor: Mesh = nodes["Floor"] as Mesh;

	return (
		<group name={name}>
			{/** Walls */}
			<mesh geometry={Walls.geometry} position={Walls.position} material={wallMaterial} />

			{/** Roof */}
			<mesh geometry={Roof.geometry} position={Roof.position} material={roofMaterial} />

			{/** Floor */}
			<mesh geometry={Floor.geometry} position={Floor.position} material={floorMaterial} />
		</group>
	);
};

export default Foundation;
