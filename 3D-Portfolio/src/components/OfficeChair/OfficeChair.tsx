import { DoubleSide, Mesh, MeshStandardMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { folder, useControls } from "leva";
import InstantiatedMesh from "../InstanciatedMesh/InstantiatedMesh";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Sit: Mesh = nodes["Sit"] as Mesh;
	const Backrest: Mesh = nodes["Backrest"] as Mesh;
	const BackrestController: Mesh = nodes["BackrestController"] as Mesh;
	const BackrestSide: Mesh = nodes["BackrestSide"] as Mesh;
	const BackrestAmature: Mesh = nodes["BackrestAmature"] as Mesh;
	const BackrestStrapHolder: Mesh = nodes["BackrestStrapHolder"] as Mesh;
	const BackrestPillow: Mesh = nodes["BackrestPillow"] as Mesh;
	const ChairStand: Mesh = nodes["ChairStand"] as Mesh;
	const ChairSitHolder: Mesh = nodes["ChairSitHolder"] as Mesh;
	const RightBackrestStrap: Mesh = nodes["RightBackrestStrap"] as Mesh;
	const LeftBackrestStrap: Mesh = nodes["LeftBackrestStrap"] as Mesh;
	const Roll: Mesh = nodes["Rolls"] as Mesh;

	const officeChairParams = useControls(
		"OfficeChair",
		{
			Rolls: folder({
				position: { value: { x: 5.94, y: 0.1, z: -0.95 }, step: 0.01 },
				rotation: { value: { x: 0, y: 136, z: 0 }, step: 10 },
			}),
		},
		{ collapsed: true }
	);

	const chairRollInstances = [
		{
			position: [5.94, 0.1, -0.95] as [number, number, number],
			rotation: [0, 136, 0] as [number, number, number],
		},
	];

	return (
		<group name={name}>
			<mesh geometry={Sit.geometry} rotation={Sit.rotation} position={Sit.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={Backrest.geometry} rotation={Backrest.rotation} position={Backrest.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={BackrestController.geometry} rotation={BackrestController.rotation} position={BackrestController.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={BackrestSide.geometry} rotation={BackrestSide.rotation} position={BackrestSide.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={BackrestAmature.geometry} rotation={BackrestAmature.rotation} position={BackrestAmature.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={BackrestStrapHolder.geometry} rotation={BackrestStrapHolder.rotation} position={BackrestStrapHolder.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={BackrestPillow.geometry} rotation={BackrestPillow.rotation} position={BackrestPillow.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={ChairStand.geometry} rotation={ChairStand.rotation} position={ChairStand.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={ChairSitHolder.geometry} rotation={ChairSitHolder.rotation} position={ChairSitHolder.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={RightBackrestStrap.geometry} rotation={RightBackrestStrap.rotation} position={RightBackrestStrap.position}>
				<meshStandardMaterial />
			</mesh>

			<mesh geometry={LeftBackrestStrap.geometry} rotation={LeftBackrestStrap.rotation} position={LeftBackrestStrap.position}>
				<meshStandardMaterial />
			</mesh>

			<InstantiatedMesh geometry={Roll.geometry} material={new MeshStandardMaterial({ side: DoubleSide })} instance={chairRollInstances} />
		</group>
	);
};

export default OfficeChair;
