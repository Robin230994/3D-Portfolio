import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCameraStore } from "../Stores/useCameraStore";
import { useEffect } from "react";

const useOrbitControlsEvents = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const setDragging = useCameraStore((s) => s.setDragging);
	const setUserMovedCamera = useCameraStore((s) => s.setUserMovedCamera);

	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		let isInteracting = false;
		let didRotate = false;

		const start = () => {
			isInteracting = true;
			didRotate = false;
			setDragging(true);
		};

		const change = () => {
			if (isInteracting) didRotate = true;
		};

		const end = () => {
			if (!isInteracting) return;
			isInteracting = false;
			setDragging(false);
			if (didRotate) setUserMovedCamera(true);
		};

		controls.addEventListener("start", start);
		controls.addEventListener("change", change);
		controls.addEventListener("end", end);

		return () => {
			controls.removeEventListener("start", start);
			controls.removeEventListener("change", change);
			controls.removeEventListener("end", end);
		};
	}, [controlsRef, setDragging, setUserMovedCamera]);
};

export default useOrbitControlsEvents;
