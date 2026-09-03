import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { foundationMaterial } from "../../Helper/GLMaterials";

import PictureFrame from "../Targets/PictureFrame/PictureFrame";
import Window from "../Targets/Window/Window";
import PositionMarker from "../PositionMarker/PositionMarker";
import { useCameraStore } from "../../Stores/useCameraStore";

const Foundation: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Foundation = nodes["foundation_t1"] as Mesh;
	const setCurrentCameraPlace = useCameraStore((state) => state.setCurrentCameraPlace);

	return (
		<group name={name}>
			{/** Foundation */}
			<mesh geometry={Foundation.geometry} position={Foundation.position} material={foundationMaterial} scale={Foundation.scale} />

			{/** Window */}
			<Window name="Window" nodes={nodes} />

			{/** Picture Frame */}
			<PictureFrame name="PictureFrame" nodes={nodes} />

			<PositionMarker nodes={nodes} position={[-1.3, 0.1, -0.1]} dispatch={() => setCurrentCameraPlace("RoomPointOne")} />
		</group>
	);
};

export default Foundation;
