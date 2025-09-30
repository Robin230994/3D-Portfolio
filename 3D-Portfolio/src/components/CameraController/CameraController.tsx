import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import useCameraMovement from "../../hooks/useCameraMovement";

interface CameraControllerProps {
	isDebugMode: boolean;
}

const CameraController: React.FC<CameraControllerProps> = ({ isDebugMode }) => {
	const controlsRef = useRef<OrbitControlsImpl>(null);

	useCameraMovement(controlsRef);

	return <>{isDebugMode && <OrbitControls makeDefault ref={controlsRef} enablePan={false} enableDamping={true} enableZoom={false} />}</>;
};

export default CameraController;
