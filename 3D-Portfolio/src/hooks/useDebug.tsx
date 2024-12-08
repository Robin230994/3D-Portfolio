import { folder, useControls } from "leva";
import { useEffect } from "react";

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
			ambientLightIntensity: { value: 3, min: 1, max: 10, step: 0.1 },
		}),
	});

	return {
		Floor: floorParams,
		FrontWall: frontWallParams,
		Lights: {
			AmbientLight: {
				intensity: lightParams.ambientLightIntensity,
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
