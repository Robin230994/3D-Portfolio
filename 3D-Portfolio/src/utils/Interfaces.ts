import { AnimationClip, BufferGeometry, DirectionalLight, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

export interface CustomMeshProps {
	name: string;
	nodes: { [key: string]: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | DirectionalLight };
	materials?: { [key: string]: Material | Material | Material[] };
	animations?: AnimationClip[];
}

export interface ISong {
	id: number;
	title: string;
	file: string;
}

export interface IProjectDescription {
	projectName: string;
	heading: string;
	text: string;
	tags: string[];
	images?: {
		src: string;
		alt?: string;
	}[];
	video?: {
		src: string;
		poster?: string;
	};
	moreInfo?: string;
}
