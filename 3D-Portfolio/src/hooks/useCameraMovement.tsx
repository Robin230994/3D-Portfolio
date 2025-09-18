import { useFrame, useThree } from "@react-three/fiber";
import { Euler, PerspectiveCamera, Quaternion, Vector3 } from "three";
import { useFocusContext } from "./useFocusContext";
import { useRef, useState } from "react";
import { MathUtils } from "three";
import { Matrix4 } from "three";
import { useCameraContext } from "./useCameraContext";

const cameraPresets: Record<string, { position: [number, number, number]; target: [number, number, number] }> = {
	FCBox: {
		position: [0.1, 0.5, -1.2],
		target: [0.1, 0.3, -2.1],
	},
	Musterbox: {
		position: [-3.7, 0.9, -1.2],
		target: [-3.6, -1, -5],
	},
	OcculusQuest: {
		position: [3.2, 0, -0.4],
		target: [0, -7.7, -14],
	},
	BambuLab: {
		position: [-3.7, 0.4, -0.5],
		target: [-3.8, -2, 10],
	},
	Macbook: {
		position: [5.15, 0, -0.3],
		target: [5.1, -4.5, -10],
	},
	BillardTriangle: {
		position: [-5.5, 1, -2.1],
		target: [-30.7, -5, -3],
	},
};

const ORIGIN_POINT = { position: new Vector3(3.6, 0.5, 0), target: new Vector3(0, 0, 0) };
const CAMERA_MOVEMENT_SPEED = 0.03;
const CAMERA_DAMPING = 0.02;
const CAMERA_ORIGIN_FOV = 50;

const useCameraMovement = (isDebugMode: boolean) => {
	const [lastFocusedTarget, setLastFocusedTarget] = useState<Vector3>(new Vector3());

	const { cameraIsMoving, setCameraIsMoving } = useCameraContext();
	const { selectObjectFocus } = useFocusContext();
	const { camera, pointer, invalidate } = useThree() as {
		camera: PerspectiveCamera;
		pointer: { x: number; y: number };
		invalidate: () => void;
	};
	const baseQuaternion = new Quaternion();
	baseQuaternion.setFromRotationMatrix(new Matrix4().lookAt(ORIGIN_POINT.position, ORIGIN_POINT.target, new Vector3(0, 1, 0)));
	const targetQuaternion = useRef(new Quaternion());
	const currentQuaternion = useRef(new Quaternion());

	useFrame(() => {
		if (isDebugMode) return;
		if (selectObjectFocus !== null) {
			const preset = cameraPresets[selectObjectFocus.name];
			if (!preset) return;

			const [px, py, pz] = preset.position;
			const [tx, ty, tz] = preset.target;
			setLastFocusedTarget(new Vector3(tx, ty, tz));

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
			const distanceToOrigin = camera.position.distanceTo(ORIGIN_POINT.position);
			const movingToOrigin = distanceToOrigin > 0.01;

			if (movingToOrigin) {
				setCameraIsMoving(true);
				camera.position.lerp(ORIGIN_POINT.position, CAMERA_MOVEMENT_SPEED);
				const t = 1 - Math.min(distanceToOrigin / ORIGIN_POINT.position.distanceTo(lastFocusedTarget || ORIGIN_POINT.target), 1);

				const interpolatedTarget = new Vector3().lerpVectors(lastFocusedTarget || ORIGIN_POINT.target, ORIGIN_POINT.target, t);

				camera.lookAt(interpolatedTarget);
				invalidate();
			} else {
				if (cameraIsMoving) setCameraIsMoving(false);
				setLastFocusedTarget(new Vector3());
				camera.position.copy(ORIGIN_POINT.position);
				//camera.lookAt(ORIGIN_POINT.target);

				listenToMouseMovement();
				invalidate();
			}
		}
	});

	const changeFOV = (fov = CAMERA_ORIGIN_FOV) => {
		camera.fov = MathUtils.lerp(camera.fov, fov, CAMERA_MOVEMENT_SPEED);
		camera.updateProjectionMatrix();
	};

	const listenToMouseMovement = () => {
		const xNorm = (pointer.x + 1) / 2;
		const yNorm = (pointer.y + 1) / 2;

		// Mouse rotation as Euler
		const offsetEuler = new Euler(
			MathUtils.lerp(-Math.PI / 3, Math.PI / 3, yNorm), // pitch (X)
			MathUtils.lerp(-Math.PI, Math.PI, -xNorm), // yaw (Y)
			0,
			"YXZ"
		);

		const offsetQuat = new Quaternion().setFromEuler(offsetEuler);

		// Combine: base orientation * offset
		targetQuaternion.current.copy(baseQuaternion).multiply(offsetQuat);

		// Smooth slerp
		currentQuaternion.current.slerp(targetQuaternion.current, CAMERA_DAMPING);

		camera.quaternion.copy(currentQuaternion.current);
	};

	return { cameraIsMoving };
};

export default useCameraMovement;
