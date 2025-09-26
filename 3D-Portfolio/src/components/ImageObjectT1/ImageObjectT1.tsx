import { CircleGeometry, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, ShaderMaterial } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { iot1Material } from "../../Helper/GLMaterials";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import OfficeChair from "../Targets/OfficeChair/OfficeChair";
import OcculusQuest from "../Targets/OccolusQuest/OcculusQuest";

const ImageObjectT1: React.FC<CustomMeshProps> = ({ name, nodes, animations }) => {
	const IObjectT1: Mesh = nodes["image_object_t1"] as Mesh;

	const coffeeSmokeMatRef = useRef<ShaderMaterial | null>(null);

	const { coffeeTPos, coffeeTRot, coffeeSPos, coffeeSRot } = useControls("CoffeeTexture", {
		coffeeTPos: { value: { x: 7.53, y: 1.42, z: -0.86 }, step: 0.01 },
		coffeeTRot: { value: { x: -Math.PI / 2, y: 0, z: 0 }, step: 0.01 },
		coffeeSPos: { value: { x: 0, y: 0, z: 0.065 }, step: 0.01 },
		coffeeSRot: { value: { x: Math.PI / 2, y: Math.PI / 2, z: 0 }, step: 0.01 },
	});

	useFrame((state) => {
		const { clock } = state;
		if (coffeeSmokeMatRef.current) {
			coffeeSmokeMatRef.current.uniforms.uTime.value = clock.getElapsedTime();
		}
	});

	return (
		<group name={name}>
			<mesh geometry={IObjectT1.geometry} position={IObjectT1.position} rotation={IObjectT1.rotation} material={iot1Material} scale={IObjectT1.scale} />

			{/** Coffee Texture */}
			<mesh
				geometry={new CircleGeometry(0.065, 32)}
				material={new MeshStandardMaterial()}
				position={[coffeeTPos.x, coffeeTPos.y, coffeeTPos.z]}
				rotation={[coffeeTRot.x, coffeeTRot.y, coffeeTRot.z]}>
				{/** Coffee smoke shader */}
				<mesh
					geometry={new PlaneGeometry(0.125, 0.1, 16, 64)}
					position={[coffeeSPos.x, coffeeSPos.y, coffeeSPos.z]}
					rotation={[coffeeSRot.x, coffeeSRot.y, coffeeSRot.z]}>
					<coffeeSmokeMaterial ref={coffeeSmokeMatRef} transparent side={DoubleSide} depthWrite={false} />
				</mesh>
			</mesh>

			<OfficeChair name="OfficeChair" nodes={nodes} animations={animations} />
			<OcculusQuest name="OcculusQuest" nodes={nodes} />
		</group>
	);
};

export default ImageObjectT1;
