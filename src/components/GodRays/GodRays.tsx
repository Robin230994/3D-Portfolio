import { folder, useControls } from "leva";
import { AdditiveBlending, Color, DoubleSide, Mesh, ShaderMaterial } from "three";
import { CustomMeshProps } from "../../utils/Interfaces";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import vertexShader from "../../shaders/GodRays/vertex.glsl";
import fragmentShader from "../../shaders/GodRays/fragment.glsl";

const godRaysMaterial = new ShaderMaterial({
	fragmentShader,
	vertexShader,
	uniforms: {
		uColor: { value: new Color("#fff4df") },
		uTime: { value: 0 },
		uIntensity: { value: 0.16 },
		uRayCount: { value: 3 },
	},
	side: DoubleSide,
	transparent: true,
	depthWrite: false,
	depthTest: true,
	blending: AdditiveBlending,
});

const GodRays: React.FC<CustomMeshProps> = ({ nodes }) => {
	const SimulatedGodRays = nodes["SimulatedGodRays"] as Mesh;
	const godRaysRef = useRef<Mesh>(null!);

	const { godRaysPosition, godRaysRotation, godRaysScale, uColor, uIntensity, uRayCount } = useControls("SimulatedGodRays", {
		General: folder({
			godRaysPosition: {
				value: { x: 9.2, y: 3.3, z: -0.1 },
				step: 0.1,
			},

			godRaysRotation: {
				value: { x: 0, y: 0, z: 0.4 },
				step: 0.1,
			},

			godRaysScale: {
				value: { x: 3.5, y: 0.6, z: 0.9 },
				step: 0.1,
			},
		}),

		Uniforms: folder({
			uColor: {
				value: "#fff4df",
			},
			uIntensity: {
				value: 0.05,
				min: 0,
				max: 1,
				step: 0.01,
			},
			uRayCount: {
				value: 6,
				min: 1,
				max: 10,
				step: 1,
			},
		}),
	});

	useEffect(() => {
		const material = godRaysRef.current?.material as ShaderMaterial | undefined;
		if (!material) return;

		material.uniforms.uColor.value.set(uColor);
		material.uniforms.uIntensity.value = uIntensity;
		material.uniforms.uRayCount.value = uRayCount;
	}, [uColor, uIntensity, uRayCount]);

	useFrame(({ clock }) => {
		(godRaysRef.current.material as ShaderMaterial).uniforms.uTime.value = clock.elapsedTime;
	});

	return (
		<group
			name="god-rays"
			scale={[godRaysScale.x, godRaysScale.y, godRaysScale.z]}
			position={[godRaysPosition.x, godRaysPosition.y, godRaysPosition.z]}
			rotation={[godRaysRotation.x, godRaysRotation.y, godRaysRotation.z]}>
			<mesh ref={godRaysRef} position={[0, 0, 0]} geometry={SimulatedGodRays.geometry} material={godRaysMaterial} />
		</group>
	);
};

export default GodRays;
