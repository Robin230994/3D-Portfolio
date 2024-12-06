import { useControls } from "leva";
import MaterialCreator from "../classes/MaterialCreator";

type DebugParams = {
	[label: string]: Record<string, number>;
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

	materialCreatorInstance.tweakMaterial("FloorMat", floorParams);
	materialCreatorInstance.tweakMaterial("WallMat", wallParams);

	return {
		Floor: floorParams,
		Wall: wallParams,
	};
};

export default useDebug;
