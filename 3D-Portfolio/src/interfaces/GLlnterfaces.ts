import { AnimationClip, BufferGeometry, DirectionalLight, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

export interface CustomMeshProps {
	name: string;
	nodes: { [key: string]: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | DirectionalLight };
	materials?: { [key: string]: Material | Material | Material[] };
	animations?: AnimationClip[];
}
