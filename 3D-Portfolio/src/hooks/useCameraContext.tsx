import { useContext } from "react";
import { CameraContext } from "../Helper/Context/CameraContext";

export const useCameraContext = () => {
	const ctx = useContext(CameraContext);
	if (!ctx) throw new Error("useCameraContext must be used inside a CameraProvider");
	return ctx;
};
