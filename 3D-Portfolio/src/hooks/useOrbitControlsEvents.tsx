import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCameraStore } from "../Stores/useCameraStore";
import { useEffect } from "react";

const useOrbitControlsEvents = (controlsRef: React.RefObject<OrbitControlsImpl>) => {
	const setDragging = useCameraStore((s) => s.setDragging);

	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const start = () => {
			setDragging(true);
		};

		const end = () => {
			setDragging(false);
		};

		controls.addEventListener("start", start);
		controls.addEventListener("end", end);

		return () => {
			controls.removeEventListener("start", start);
			controls.removeEventListener("end", end);
		};
	}, [controlsRef, setDragging]);
};

export default useOrbitControlsEvents;
