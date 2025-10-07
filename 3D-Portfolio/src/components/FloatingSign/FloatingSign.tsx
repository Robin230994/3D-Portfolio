import { useSpring, animated } from "@react-spring/three";
import { Center, Float, Text3D } from "@react-three/drei";
import { useControls } from "leva";

interface FloatingSignProps {
	visible: boolean;
	position?: [number, number, number];
	rotation?: [number, number, number];
	size?: number;
	height?: number;
}

const FloatingSign: React.FC<FloatingSignProps> = ({ visible, position = [0, 0, 0], rotation = [0, 0, 0], size = 0.2, height = 0.05 }) => {
	const { signPos, signRot } = useControls("FloatingSigns", {
		signPos: { value: { x: 5.6, y: 2.3, z: -1.9 }, step: 0.1 },
		signRot: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
	});

	const { scale, opacity } = useSpring({
		scale: visible ? [1, 1, 1] : [0, 0, 0],
		opacity: visible ? 1 : 0,
		config: { mass: 1, tension: 400, friction: 12 },
	});

	return (
		<Center position={[signPos.x, signPos.y, signPos.z]} rotation={[signRot.x, signRot.y, signRot.z]}>
			<Float>
				<animated.group scale={scale as unknown as [number, number, number]}>
					<Text3D font="/fonts/Inter_Bold.json" size={size} height={height} bevelEnabled bevelSize={0.01} bevelThickness={0.01}>
						x
						<animated.meshStandardMaterial opacity={opacity} transparent />
					</Text3D>
				</animated.group>
			</Float>
		</Center>
	);
};

export default FloatingSign;
