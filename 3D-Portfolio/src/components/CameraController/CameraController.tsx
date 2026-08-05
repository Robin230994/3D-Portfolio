import React, { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { cameraPresets } from "../../Presets/Presets";
import { useControls } from "leva";
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

	const { cameraPos, cameraRot, azimuthal, polar, hdeg2rad, vdeg2rad } = useControls("Camera Presets", {
		cameraPos: {
			value: [...cameraPresets.RoomPointOne.position],
			step: 0.1,
		},
		cameraRot: {
			value: [...cameraPresets.RoomPointOne.target],
			step: 0.1,
		},
		azimuthal: {
			value: cameraPresets.RoomPointOne.azimuthal,
			step: 0.1,
		},
		polar: {
			value: cameraPresets.RoomPointOne.polar,
			step: 0.1,
		},
		hdeg2rad: {
			value: cameraPresets.RoomPointOne.hdeg2rad,
			step: 0.1,
		},
		vdeg2rad: {
			value: cameraPresets.RoomPointOne.vdeg2rad,
			step: 0.1,
		},
	});

	//initialize start position of camera
	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		if (isDebugMode) {
			controls.object.position.set(...cameraPos);
			controls.target.set(...cameraRot);
			controls.minAzimuthAngle = azimuthal * (Math.PI / 180) - hdeg2rad * (Math.PI / 180);
			controls.maxAzimuthAngle = azimuthal * (Math.PI / 180) + hdeg2rad * (Math.PI / 180);
			controls.minPolarAngle = polar * (Math.PI / 180) - vdeg2rad * (Math.PI / 180);
			controls.maxPolarAngle = polar * (Math.PI / 180) + vdeg2rad * (Math.PI / 180);
		} else {
			const startPreset = cameraPresets.IntroPoint;
			controls.object.position.set(...startPreset.position);
			controls.target.set(...startPreset.target);
			controls.minAzimuthAngle = startPreset.azimuthal * (Math.PI / 180) - startPreset.hdeg2rad * (Math.PI / 180);
			controls.maxAzimuthAngle = startPreset.azimuthal * (Math.PI / 180) + startPreset.hdeg2rad * (Math.PI / 180);
			controls.minPolarAngle = startPreset.polar * (Math.PI / 180) - startPreset.vdeg2rad * (Math.PI / 180);
			controls.maxPolarAngle = startPreset.polar * (Math.PI / 180) + startPreset.vdeg2rad * (Math.PI / 180);
		}
	}, [cameraPos, cameraRot, isDebugMode, azimuthal, polar, hdeg2rad, vdeg2rad]);

	useFrame(() => {
		const controls = controlsRef.current;

		if (!controls) return;

		controls.update();

		// console.log("Pos: ", controls?.object.position);
		// console.log("Target: ", controls?.target);
		// console.log("Azimuth:", controls.getAzimuthalAngle());
		// console.log("Polar:", controls.getPolarAngle());
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
