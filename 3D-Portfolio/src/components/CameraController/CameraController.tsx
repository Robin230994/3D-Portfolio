import React, { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCamera as TPerspectiveCamera } from "three";
import { useControls } from "leva";
import useCameraMovement from "../../hooks/useCameraMovement";

interface CameraControllerProps {
	isDebugMode: boolean;
}

const CameraController: React.FC<CameraControllerProps> = ({ isDebugMode }) => {
	const cameraRef = useRef<TPerspectiveCamera>(null);
	useCameraMovement(isDebugMode);

	const { cameraPos, cameraTarget, fov } = useControls("CameraControls", {
		cameraPos: { value: { x: 6.0, y: 1.0, z: 0 }, step: 0.1 },
		cameraTarget: { value: { x: 0, y: 0.9, z: -0.2 }, step: 0.1 },
		fov: { value: 75, step: 1 },
	});

	useEffect(() => {
		if (cameraRef.current) {
			cameraRef.current.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
			cameraRef.current.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z);
		}
	}, [cameraPos, cameraTarget]);

	return (
		<>
			<PerspectiveCamera ref={cameraRef} makeDefault={!isDebugMode} fov={fov} position={[cameraPos.x, cameraPos.y, cameraPos.z]} />
			{isDebugMode && <OrbitControls makeDefault />}
		</>
	);
};

export default CameraController;
