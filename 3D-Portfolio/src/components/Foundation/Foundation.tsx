import { Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { foundationMaterial } from "../../Helper/GLMaterials";
import { useCameraStore } from "../../Stores/useCameraStore";

import PictureFrame from "../Targets/PictureFrame/PictureFrame";
import Window from "../Targets/Window/Window";
import PositionMarker from "../PositionMarker/PositionMarker";

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

			<PositionMarker
				nodes={nodes}
				position={[1, 0.1, 0]}
				areaPosition={[1.5, 0.1, 0]}
				positionKey="IntroPoint"
				dispatch={() => setCurrentCameraPlace("IntroPoint")}
			/>

			<PositionMarker
				nodes={nodes}
				position={[-1.3, 0.1, -0.1]}
				areaPosition={[-2.5, 0.1, -0.2]}
				positionKey="RoomPointOne"
				dispatch={() => setCurrentCameraPlace("RoomPointOne")}
			/>

			<PositionMarker
				nodes={nodes}
				position={[2.2, 0.1, 0.4]}
				areaPosition={[5, 0.1, 1]}
				positionKey="RoomPointTwo"
				dispatch={() => setCurrentCameraPlace("RoomPointTwo")}
			/>
		</group>
	);
};

export default Foundation;
