import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { MathUtils, Object3D } from "three";

const useCameraMovement = (cameraRef: RefObject<CameraControls>) => {
	const { size } = useThree();
	const lastAzimuth = useRef(0);
	const lastPolar = useRef(Math.PI / 2.5);

	const { maxAzimuth, minAzimuth, maxPolar, minPolar } = useControls("CameraMovement", {
		maxAzimuth: { value: 0.4, step: 0.01 },
		minAzimuth: { value: -0.4, step: 0.01 },
		maxPolar: { value: Math.PI / 2 - 0.2, step: 0.01 },
		minPolar: { value: Math.PI / 2.5, step: 0.01 },
	});

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!cameraRef.current) return;

			const xNorm = (e.clientX / size.width) * 2 - 1; // [-1, 1]
			const yNorm = (e.clientY / size.height) * 2 - 1; // [-1, 1]

			const targetAzimuth = MathUtils.clamp(-xNorm * maxAzimuth, minAzimuth, maxAzimuth);
			const targetPolar = MathUtils.clamp(((1 - yNorm) / 2) * (maxPolar - minPolar) + minPolar, minPolar, maxPolar);
			cameraRef.current.rotateTo(targetAzimuth, targetPolar, true);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [cameraRef, maxAzimuth, maxPolar, minAzimuth, minPolar, size.height, size.width]);

	const handleClickedTarget = useCallback(
		(targetObject: Object3D) => {
			if (!targetObject || !cameraRef.current) return;
			cameraRef.current.fitToBox(targetObject, true);
		},
		[cameraRef]
	);

	return { handleClickedTarget };
};

export default useCameraMovement;
