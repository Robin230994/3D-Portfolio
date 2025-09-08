import { createContext } from "react";

type CameraContextType = {
	cameraIsMoving: boolean;
	setCameraIsMoving: (moving: boolean) => void;
};

export const CameraContext = createContext<CameraContextType | undefined>(undefined);
