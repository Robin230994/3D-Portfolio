import { Color, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { blackPlasticMaterial } from "../../Helper/GLMaterials";
import MaterialCreator from "../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const floorLampMaterial = materialCreator.createEmptyLambertMaterial("FloorLamp");
floorLampMaterial.color = new Color("#e2cba3");

const FloorLamp: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const FloorLampBase: Mesh = nodes["FloorLamp_Stem"] as Mesh;
	const FloorLampCover: Mesh = nodes["FloorLamp_Cover"] as Mesh;

	return (
		<group name={name}>
			<mesh geometry={FloorLampBase.geometry} position={[1.852, 0.687, -2.602]} rotation={FloorLampBase.rotation} material={blackPlasticMaterial} />
			<mesh geometry={FloorLampCover.geometry} position={[1.852, 2.1, -2.602]} rotation={FloorLampCover.rotation} material={floorLampMaterial} castShadow />
		</group>
	);
};

export default FloorLamp;
