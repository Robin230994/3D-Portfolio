import { BufferGeometry, DirectionalLight, Group, Material, MathUtils, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import MaterialCreator from "../../classes/MaterialCreator";
import { useCameraStore } from "../../Stores/useCameraStore";

interface IPositionMarkerProps {
	position: [number, number, number];
	areaPosition: [number, number, number];
	rotation?: [number, number, number];
	nodes: {
		[key: string]: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | DirectionalLight;
	};
	positionKey: string;
	dispatch: () => void;
}

const materialCreator = MaterialCreator.getInstance();
const pointerMaterial = materialCreator.createEmptyStandardMaterial("PointerMaterial");
pointerMaterial.color.set("#ffffff");
pointerMaterial.emissive.set("#ffffff");
pointerMaterial.emissiveIntensity = 2.4;
pointerMaterial.transparent = true;
pointerMaterial.opacity = 0;
pointerMaterial.depthWrite = false;
pointerMaterial.roughness = 0.25;
pointerMaterial.metalness = 0;
pointerMaterial.toneMapped = false;

const SPEED = 2; // Speed of the up and down movement
const AMPLITUDE = 0.25; // Amplitude of the up and down movement

const PositionMarker: React.FC<IPositionMarkerProps> = ({ nodes, position, areaPosition, positionKey, dispatch }) => {
	const currentCameraPlaceKey = useCameraStore((state) => state.currentCameraPlaceKey);

	const PositionMarkerMesh = nodes["PositionMarker"] as Mesh;
	const PositionMarkerBase = nodes["PositionMarkerBase"] as Mesh;
	const positionMarkerRef = useRef<Mesh>(null);
	const positionGroupRef = useRef<Group>(null);

	const baseY = useRef(position[1] + 1); // Base Y position for the up and down movement

	const [pointerHovered, setPointerHovered] = useState(false);

	useFrame(({ clock }, delta) => {
		if (!positionGroupRef.current || !positionMarkerRef.current) return;

		positionMarkerRef.current.position.y = baseY.current + Math.sin(clock.elapsedTime * SPEED) * AMPLITUDE;
		pointerMaterial.opacity = MathUtils.damp(pointerMaterial.opacity, pointerHovered ? 0.62 : 0, 7, delta);
	});

	return (
		<group
			visible={currentCameraPlaceKey !== positionKey}
			onClick={(event) => {
				event.stopPropagation();
				dispatch();
			}}
			onPointerEnter={() => {
				setPointerHovered(true);
				document.body.style.cursor = "pointer";
			}}
			onPointerLeave={() => {
				setPointerHovered(false);
				document.body.style.cursor = "default";
			}}>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={areaPosition}>
				<planeGeometry args={[3.5, 3.5]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>
			<group ref={positionGroupRef} position={position}>
				<mesh
					ref={positionMarkerRef}
					geometry={PositionMarkerMesh.geometry}
					position={[position[0], position[1] + 1, position[2]]}
					material={pointerMaterial}></mesh>
				<mesh geometry={PositionMarkerBase.geometry} position={position} material={pointerMaterial}></mesh>
			</group>
		</group>
	);
};

export default PositionMarker;
