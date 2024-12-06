import { folder, useControls } from "leva";
import { FolderSettings } from "leva/dist/declarations/src/types";
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

const useDebug = (materialCreatorInstance: MaterialCreator): DebugParams => {
	const floorParams = useControls("Floor", {
		roughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
		metalness: { value: 0.5, min: 0, max: 1, step: 0.1 },
	});

	const wallParams = useControls("Wall", {
		roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },
		metalness: { value: 0.1, min: 0, max: 1, step: 0.1 },
	});

	const { ambientLightIntensity } = useControls("Lights", {
		AmbientLight: folder({
			ambientLightIntensity: { value: 1.5, min: 1, max: 10, step: 0.1 },
		}),
	});

	materialCreatorInstance.tweakMaterial("FloorMat", floorParams);
	materialCreatorInstance.tweakMaterial("WallMat", wallParams);

	return {
		Floor: floorParams,
		FrontWall: wallParams,
		Lights: {
			AmbientLight: {
				intensity: ambientLightIntensity,
			},
		},
	};
};

export default useDebug;
