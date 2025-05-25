import { CameraControls } from "@react-three/drei";
import { useControls } from "leva";
import { forwardRef, RefObject } from "react";
import { useThree } from "@react-three/fiber";
import useCameraMovement from "../../hooks/useCameraControlsMovement";

interface CameraControllerProps {
	isDebugMode: boolean;
}

const CameraController = forwardRef<CameraControls, CameraControllerProps>(({ isDebugMode }, ref) => {
	const { camera } = useThree();
	useCameraMovement(ref as RefObject<CameraControls>);

	const { minDistance, maxDistance, smoothTime } = useControls("CameraControls", {
		minDistance: { value: 1, step: 0.1 },
		maxDistance: { value: 2.5, step: 0.1 },
		smoothTime: { value: 0.5, step: 0.001 },
	});
	return <CameraControls ref={ref} camera={camera} minDistance={minDistance} maxDistance={maxDistance} smoothTime={smoothTime} makeDefault={!isDebugMode} />;
});

export default CameraController;
