import { FC, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, ShaderMaterial } from "three";

const WorldReveal: FC = () => {
	const worldRevealMaterialRef = useRef<ShaderMaterial | null>(null);

	useFrame((_, delta) => {
		const worldRevealMaterial = worldRevealMaterialRef.current;
		if (!worldRevealMaterial) return;

		worldRevealMaterial.uniforms.uRadius.value = Math.min(worldRevealMaterial.uniforms.uRadius.value + delta, 5);
	});

	return (
		<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
			<sphereGeometry args={[1, 64, 64]} />
			{/* <meshStandardMaterial side={DoubleSide} /> */}
			<worldRevealShaderMaterial ref={worldRevealMaterialRef} side={DoubleSide} transparent />
		</mesh>
	);
};

export default WorldReveal;
