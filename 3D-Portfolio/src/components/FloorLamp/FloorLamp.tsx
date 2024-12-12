import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const FloorLamp: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const FloorLampBase: Mesh = nodes["FloorLamp_Stem"] as Mesh;
	const FloorLampCover: Mesh = nodes["FloorLamp_Cover"] as Mesh;
	return (
		<group name={name}>
			<mesh geometry={FloorLampBase.geometry} position={[1.852, 0.687, -2.602]} rotation={FloorLampBase.rotation} />
			<mesh geometry={FloorLampCover.geometry} position={[1.852, 2.1, -2.602]} rotation={FloorLampCover.rotation} />
		</group>
	);
};

export default FloorLamp;
