import { CameraControls, OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { CameraHelper, PerspectiveCamera as TPerspectiveCamera } from "three";
import { useControls } from "leva";
import { forwardRef, MutableRefObject, RefObject, useEffect, useRef } from "react";
import ACTION from "camera-controls";
import useCameraMovement from "../../hooks/useCameraControlsMovement";

interface CameraControllerProps {
	isDebugMode: boolean;
}

const CameraController = forwardRef<CameraControls, CameraControllerProps>(({ isDebugMode }, ref) => {
	const cameraRef = useRef<TPerspectiveCamera>(null);

	useHelper(cameraRef as MutableRefObject<TPerspectiveCamera>, CameraHelper);
	useCameraMovement(ref as RefObject<CameraControls>);

	const { minDistance, maxDistance, smoothTime, cameraPos, cameraTarget } = useControls("CameraControls", {
		minDistance: { value: 1, step: 0.1 },
		maxDistance: { value: 2.5, step: 0.1 },
		smoothTime: { value: 0.5, step: 0.001 },
		cameraPos: { value: { x: -1, y: 0, z: 0 }, step: 0.1 },
		cameraTarget: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
	});

	useEffect(() => {
		const controls = (ref as RefObject<CameraControls>)?.current;
		if (controls && cameraRef.current) {
			cameraRef.current.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
			controls.setLookAt(cameraPos.x, cameraPos.y, cameraPos.z, cameraTarget.x, cameraTarget.y, cameraTarget.z, true);
		}
	}, [cameraPos.x, cameraPos.y, cameraPos.z, cameraTarget.x, cameraTarget.y, cameraTarget.z, ref]);

	return (
		<>
			{isDebugMode && <OrbitControls makeDefault />}
			<PerspectiveCamera makeDefault={!isDebugMode} ref={cameraRef} />
			{cameraRef.current && (
				<CameraControls
					ref={ref}
					camera={cameraRef.current}
					minDistance={minDistance}
					maxDistance={maxDistance}
					smoothTime={smoothTime}
					mouseButtons={{
						left: ACTION.ACTION.NONE,
						right: ACTION.ACTION.NONE,
						middle: ACTION.ACTION.NONE,
						wheel: ACTION.ACTION.DOLLY,
					}}
					makeDefault={!isDebugMode}
				/>
			)}
		</>
	);
});

export default CameraController;
