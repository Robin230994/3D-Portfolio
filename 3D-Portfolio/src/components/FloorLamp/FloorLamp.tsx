import { Color, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { blackPlasticMaterial } from "../../Helper/GLMaterials";
import MaterialCreator from "../../classes/MaterialCreator";
import { useControls } from "leva";

const materialCreator = MaterialCreator.getInstance();

const floorLampMaterial = materialCreator.createEmptyLambertMaterial("FloorLamp");
floorLampMaterial.color = new Color("#e2cba3");

const FloorLamp: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const FloorLampBase: Mesh = nodes["FloorLamp_Stem"] as Mesh;
	const FloorLampCover: Mesh = nodes["FloorLamp_Cover"] as Mesh;

	const { floorLampBasePos, floorLampCoverPos } = useControls("FloorLamp", {
		floorLampBasePos: { value: { x: 1.82, y: 0.687, z: -2.65 } },
		floorLampCoverPos: { value: { x: 1.82, y: 2.1, z: -2.65 } },
	});

	return (
		<group name={name}>
			<mesh
				geometry={FloorLampBase.geometry}
				position={[floorLampBasePos.x, floorLampBasePos.y, floorLampBasePos.z]}
				rotation={FloorLampBase.rotation}
				material={blackPlasticMaterial}
			/>
			<mesh
				geometry={FloorLampCover.geometry}
				position={[floorLampCoverPos.x, floorLampCoverPos.y, floorLampCoverPos.z]}
				rotation={FloorLampCover.rotation}
				material={floorLampMaterial}
				castShadow
			/>
		</group>
	);
};

export default FloorLamp;
