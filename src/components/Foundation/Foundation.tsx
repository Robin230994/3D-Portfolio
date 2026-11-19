import { Mesh } from "three";
import { CustomMeshProps } from "../../utils/Interfaces";
import { foundationMaterial } from "../../utils/Materials";
import { useCameraStore } from "../../stores/useCameraStore";
import { folder, useControls } from "leva";

import PictureFrame from "../Targets/PictureFrame/PictureFrame";
import Window from "../Targets/Window/Window";
import PositionMarker from "../PositionMarker/PositionMarker";

const Foundation: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Foundation = nodes["foundation_t1"] as Mesh;
	const setCurrentCameraPlace = useCameraStore((state) => state.setCurrentCameraPlace);

	const { ceilingLightPos, ceilingLightRot, ceilingLightWidth, ceilingLightHeight, ceilingLightIntensity } = useControls("Lights", {
		Ceiling: folder(
			{
				ceilingLightPos: { value: { x: 0, y: 1.9, z: 0 }, step: 0.1 },
				ceilingLightRot: { value: { x: -Math.PI / 2, y: -Math.PI, z: 0 }, step: 0.1 },
				ceilingLightWidth: { value: 3.41, step: 0.01 },
				ceilingLightHeight: { value: 2.67, step: 0.01 },
				ceilingLightIntensity: { value: 1.5, step: 0.1 },
			},
			{ collapsed: true },
		),
	});

	return (
		<group name={name}>
			{/** Foundation */}
			<mesh geometry={Foundation.geometry} position={Foundation.position} material={foundationMaterial} scale={Foundation.scale} receiveShadow castShadow />

			{/** Emissive Ceiling lamp */}
			<mesh position={[0, 4.22, 0]}>
				<boxGeometry args={[2.48, 0.015, 0.98]} />
				<meshStandardMaterial color="#fff4df" emissive="#f4ac5a" emissiveIntensity={8} toneMapped={false} />
			</mesh>

			<rectAreaLight
				color={"#f4ac5a"}
				intensity={ceilingLightIntensity}
				position={[ceilingLightPos.x, ceilingLightPos.y, ceilingLightPos.z]}
				rotation={[ceilingLightRot.x, ceilingLightRot.y, ceilingLightRot.z]}
				width={ceilingLightWidth}
				height={ceilingLightHeight}
			/>

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
