import { useState } from "react";
import { CameraContext } from "../Context/CameraContext";

export const CameraContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [cameraIsMoving, setCameraIsMoving] = useState(false);

	return <CameraContext.Provider value={{ cameraIsMoving, setCameraIsMoving }}>{children}</CameraContext.Provider>;
};
