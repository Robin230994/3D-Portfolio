import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RefObject, useEffect } from "react";
import { MathUtils } from "three";

const useCameraControlsMovement = (cameraRef: RefObject<CameraControls>) => {
	const { size } = useThree();

	useEffect(() => {
		const maxAzimuth = 0.4; // radians (~23 degrees)
		const minAzimuth = -0.4;
		const maxPolar = Math.PI / 2 - 0.2; // slightly above horizon
		const minPolar = Math.PI / 2.5; // slightly below horizon

		const handleMouseMove = (e: MouseEvent) => {
			const xNorm = (e.clientX / size.width) * 2 - 1; // [-1, 1]
			const yNorm = (e.clientY / size.height) * 2 - 1; // [-1, 1]

			const targetAzimuth = MathUtils.clamp(-xNorm * maxAzimuth, minAzimuth, maxAzimuth);
			const targetPolar = MathUtils.clamp(((1 - yNorm) * (maxPolar - minPolar)) / 2 + minPolar, minPolar, maxPolar);

			if (cameraRef.current) {
				cameraRef.current.rotateTo(targetAzimuth, targetPolar, true); // true = enable transition
			}
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [cameraRef, size.height, size.width]);
};

export default useCameraControlsMovement;
