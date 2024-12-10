import { folder, useControls } from "leva";
import { useEffect } from "react";
import { Euler, Vector3 } from "three";

import MaterialCreator from "../classes/MaterialCreator";

type DebugParams = {
	FrontWall: {
		roughness: number;
		metalness: number;
	};
	Cup: {
		roughness: number;
		metalness: number;
		flatShading: boolean;
	};
	CupHolder: {
		roughness: number;
		metalness: number;
		flatShading: boolean;
	};
	Lights: {
		AmbientLight: {
			intensity: number;
		};
		SunLight: {
			intensity: number;
			color: string;
			position: Vector3;
			rotation: Euler;
		};
	};
};

const useDebugControls = (): DebugParams => {
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
			sunlightRotation: { value: { x: -0.8, y: 1.2, z: -2.8 }, joystick: "invertY" },
		}),
	});

	const cupParams = useControls("Cup", {
		roughness: { value: 0, min: 0, max: 1, step: 0.01 },
		metalness: { value: 0, min: 0, max: 1, step: 0.01 },
		flatShading: false,
	});

	const cupHolderParams = useControls("CupHolder", {
		roughness: { value: 0, min: 0, max: 1, step: 0.01 },
		metalness: { value: 0, min: 0, max: 1, step: 0.01 },
		flatShading: false,
	});

	return {
		FrontWall: frontWallParams,
		Cup: cupParams,
		CupHolder: cupHolderParams,
		Lights: {
			AmbientLight: {
				intensity: lightParams.ambientLightIntensity,
			},
			SunLight: {
				intensity: lightParams.sunlightIntensity,
				color: lightParams.sunlightColor,
				position: lightParams.sunlightPosition as Vector3,
				rotation: lightParams.sunlightRotation as Euler,
			},
		},
	};
};

const useDebug = (materialCreatorInstance: MaterialCreator): DebugParams => {
	const controls = useDebugControls();

	useEffect(() => {
		materialCreatorInstance.tweakMaterial("FrontWall", controls.FrontWall);
		materialCreatorInstance.tweakMaterial("Cup", controls.Cup);
		materialCreatorInstance.tweakMaterial("CupHolder", controls.CupHolder);
	}, [materialCreatorInstance, controls]);

	return controls;
};

export default useDebug;
