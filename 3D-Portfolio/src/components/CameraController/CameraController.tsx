import React, { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { cameraPresets } from "../../Presets/Presets";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import useCameraMovement from "../../hooks/useCameraMovement";
import useEdgeDetection from "../../hooks/useEdgeDetection";
import useOrbitControlsEvents from "../../hooks/useOrbitControlsEvents";

interface CameraControllerProps {
	isDebugMode: boolean;
}

const CameraController: React.FC<CameraControllerProps> = ({ isDebugMode }) => {
	const controlsRef = useRef<OrbitControlsImpl>(null);

	useOrbitControlsEvents(controlsRef);
	useCameraMovement(controlsRef);
	useEdgeDetection(controlsRef);

	// initialize start position of camera
	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;
		const startPreset = cameraPresets.IntroPoint;
		controls.object.position.set(...startPreset.position);
		controls.target.set(...startPreset.target);
		controls.minAzimuthAngle = startPreset.azimuthal * (Math.PI / 180) - startPreset.hdeg2rad * (Math.PI / 180);
		controls.maxAzimuthAngle = startPreset.azimuthal * (Math.PI / 180) + startPreset.hdeg2rad * (Math.PI / 180);
		controls.minPolarAngle = startPreset.polar * (Math.PI / 180) - startPreset.vdeg2rad * (Math.PI / 180);
		controls.maxPolarAngle = startPreset.polar * (Math.PI / 180) + startPreset.vdeg2rad * (Math.PI / 180);
	}, []);

	useFrame(() => {
		const controls = controlsRef.current;

		if (!controls) return;

		controls.update();
	});

	return (
		<>
			{isDebugMode && (
				<>
					<OrbitControls makeDefault ref={controlsRef} enablePan={true} enableDamping={true} enableZoom={false} />
				</>
			)}
		</>
	);
};

export default CameraController;
