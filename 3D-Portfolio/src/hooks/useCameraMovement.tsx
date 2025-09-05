import { useFrame, useThree } from "@react-three/fiber";
import { Euler, Quaternion, Vector3 } from "three";
import { useFocusContext } from "./useFocusContext";
import { useControls } from "leva";
import { useRef, useState } from "react";
import { MathUtils } from "three";

const cameraPresets: Record<string, { position: [number, number, number]; target: [number, number, number] }> = {
	FCBox: {
		position: [0.1, 1.3, -1.6],
		target: [0.1, 0.2, -4.0],
	},
	OcculusQuest: {
		position: [3, 0.3, -0.8],
		target: [0, -7.7, -14],
	},
};

const ORIGIN_POINT = { position: new Vector3(3.0, 1.0, 0), target: new Vector3(0, 0.9, -0.2) };
const CAMERA_MOVEMENT_SPEED = 0.03;
const CAMERA_DAMPING = 0.05;

const useCameraMovement = () => {
	const [cameraIsMoving, setCameraIsMoving] = useState<boolean>(false);

	const { selectObjectFocus } = useFocusContext();
	const { camera, pointer, invalidate } = useThree();

	const targetQuaternion = useRef(new Quaternion());
	const currentQuaternion = useRef(new Quaternion());

	// const { maxAzimuth, minAzimuth, maxPolar, minPolar } = useControls("CameraMovement", {
	// 	maxAzimuth: { value: Math.PI / 6, step: 0.01 },
	// 	minAzimuth: { value: -Math.PI / 6, step: 0.01 },
	// 	maxPolar: { value: Math.PI / 2 - 0.2, step: 0.01 },
	// 	minPolar: { value: -Math.PI - (Math.PI / 2 - 0.2), step: 0.01 },
	// });

	useFrame(() => {
		if (selectObjectFocus !== null) {
			const preset = cameraPresets[selectObjectFocus.name];
			if (!preset) return;
			const [px, py, pz] = preset.position;
			const [tx, ty, tz] = preset.target;

			const objectPos = new Vector3(px, py, pz);
			const lerpDone = camera.position.distanceTo(objectPos) < 0.01;

			if (!lerpDone) {
				setCameraIsMoving(true);
				camera.position.lerp(objectPos, CAMERA_MOVEMENT_SPEED);
				camera.lookAt(tx, ty, tz);
				invalidate();
			} else {
				if (cameraIsMoving) setCameraIsMoving(false);
				camera.position.copy(objectPos);
				camera.lookAt(tx, ty, tz);
			}
		} else {
			const lerpDone = camera.position.distanceTo(ORIGIN_POINT.position) < 0.01;

			if (!lerpDone) {
				setCameraIsMoving(true);
				camera.position.lerp(ORIGIN_POINT.position, CAMERA_MOVEMENT_SPEED);
				camera.lookAt(ORIGIN_POINT.target);
				invalidate();
			} else {
				if (cameraIsMoving) setCameraIsMoving(false);
				camera.position.copy(ORIGIN_POINT.position);
				camera.lookAt(ORIGIN_POINT.target);

				listenToMouseMovement();
				invalidate();
			}
		}
		//if (needsInvalidate) invalidate();
	});
	const listenToMouseMovement = () => {
		const xNorm = (pointer.x + 1) / 2;
		const yNorm = (pointer.y + 1) / 2;

		// Target rotations in Euler
		const targetEuler = new Euler(
			MathUtils.lerp(-Math.PI / 3, Math.PI / 3, yNorm), // pitch (X)
			MathUtils.lerp(-Math.PI, Math.PI, -xNorm), // yaw (Y)
			0, // roll (Z)
			"YXZ"
		);

		targetQuaternion.current.setFromEuler(targetEuler);

		// Smoothly slerp from current rotation to target
		currentQuaternion.current.slerp(targetQuaternion.current, CAMERA_DAMPING);

		camera.quaternion.copy(currentQuaternion.current);
	};
};

export default useCameraMovement;
