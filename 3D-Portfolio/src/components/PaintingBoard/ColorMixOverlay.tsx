import { FC, useEffect, useRef, useState } from "react";
import { ColorOption } from "../../utils/Types";
import { Hud, OrthographicCamera } from "@react-three/drei";
import { ShaderMaterial } from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface IColorMixOverlay {
	mixColorOne: ColorOption | null;
	mixColorTwo: ColorOption | null;
	onComplete: () => void;
}

const MIX_DURATION_TIME = 1.35;

const ColorMixOverlay: FC<IColorMixOverlay> = ({ mixColorOne, mixColorTwo, onComplete }) => {
	const [visible, setVisible] = useState<boolean>(false);

	const progressRef = useRef(0);
	const completedRef = useRef(false);

	const shaderMaterialRef = useRef<ShaderMaterial>(null);

	const size = useThree((state) => state.size);

	useEffect(() => {
		if (!mixColorOne || !mixColorTwo) {
			setVisible(false);
			return;
		}

		progressRef.current = 0;
		completedRef.current = false;
		setVisible(true);
	}, [mixColorOne, mixColorTwo]);

	useEffect(() => {
		if (!visible || !shaderMaterialRef.current || !mixColorOne || !mixColorTwo) return;
		shaderMaterialRef.current.uniforms.uColorOne.value.set(`#${mixColorOne.hexCode}`);
		shaderMaterialRef.current.uniforms.uColorTwo.value.set(`#${mixColorTwo.hexCode}`);
	}, [mixColorOne, mixColorTwo, visible]);

	useFrame((state, delta) => {
		if (!visible || !shaderMaterialRef.current) return;

		progressRef.current = Math.min(progressRef.current + delta / MIX_DURATION_TIME, 1);

		shaderMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
		shaderMaterialRef.current.uniforms.uProgress.value = progressRef.current;
		shaderMaterialRef.current.uniforms.uAspect.value = size.width / size.height;

		if (progressRef.current === 1 && !completedRef.current) {
			completedRef.current = true;
			setVisible(false);
			onComplete();
		}
	});

	if (!visible) return null;

	return (
		<Hud renderPriority={2}>
			<OrthographicCamera makeDefault position={[0, 0, 1]} />

			<mesh raycast={() => null} frustumCulled={false}>
				<planeGeometry args={[2, 2]} />
				<mixColorShaderMaterial ref={shaderMaterialRef} depthWrite={false} depthTest={false} transparent />
			</mesh>
		</Hud>
	);
};

export default ColorMixOverlay;
