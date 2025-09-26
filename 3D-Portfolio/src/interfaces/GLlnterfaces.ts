import { CameraControls } from "@react-three/drei";
import { RefObject } from "react";
import { AnimationClip, BufferGeometry, DirectionalLight, Group, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Scene } from "three";
import { ActionName } from "../types/GLTypes";

export interface GLTFAction extends AnimationClip {
	name: ActionName;
}

export interface CustomMeshProps {
	name: string;
	nodes: { [key: string]: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | DirectionalLight };
	materials?: { [key: string]: Material | Material | Material[] };
	animations?: GLTFAction[];
}
