import { folder, useControls } from "leva";
import { useEffect } from "react";
import { Vector3 } from "three";

import MaterialCreator from "../classes/MaterialCreator";

type DebugParams = {
	Floor: {
		roughness: number;
		metalness: number;
	};
	FrontWall: {
		roughness: number;
		metalness: number;
	};
	Lights: {
		AmbientLight: {
			intensity: number;
		};
		SunLight: {
			intensity: number;
			color: string;
			position: Vector3;
		};
	};
};

const useDebugControls = (): DebugParams => {
	const floorParams = useControls("Floor", {
		roughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
		metalness: { value: 0.5, min: 0, max: 1, step: 0.1 },
	});

	const frontWallParams = useControls("FrontWall", {
		roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },
		metalness: { value: 0.1, min: 0, max: 1, step: 0.1 },
	});

	const lightParams = useControls("Lights", {
		AmbientLight: folder({
			ambientLightIntensity: { value: 1.5, min: 1, max: 10, step: 0.1 },
		}),
		SunLight: folder({
			sunlightIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
			sunlightColor: { value: "#ffffff" },
			sunlightPosition: { value: { x: 15.6, y: 5.1, z: 2.6 }, step: 0.01, joystick: "invertY" },
		}),
	});

	return {
		Floor: floorParams,
		FrontWall: frontWallParams,
		Lights: {
			AmbientLight: {
				intensity: lightParams.ambientLightIntensity,
			},
			SunLight: {
				intensity: lightParams.sunlightIntensity,
				color: lightParams.sunlightColor,
				position: lightParams.sunlightPosition as Vector3,
			},
		},
	};
};

const useDebug = (materialCreatorInstance: MaterialCreator): DebugParams => {
	const controls = useDebugControls();

	useEffect(() => {
		materialCreatorInstance.tweakMaterial("Floor", controls.Floor);
		materialCreatorInstance.tweakMaterial("FrontWall", controls.FrontWall);
	}, [materialCreatorInstance, controls]);

	return controls;
};

export default useDebug;
