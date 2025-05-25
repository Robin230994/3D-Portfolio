import { CameraControls } from "@react-three/drei";
import { RefObject } from "react";
import { BufferGeometry, DirectionalLight, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

export interface CustomMeshProps {
	name: string;
	nodes: { [key: string]: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | DirectionalLight };
	cameraControls?: RefObject<CameraControls>;
}
