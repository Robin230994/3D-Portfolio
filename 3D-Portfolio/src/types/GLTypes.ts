import { AnimationClip, Color, Vector2 } from "three";
import { Vector3, Vector4 } from "three";
import { CubeTexture, DirectionalLight, Material, Matrix3, Matrix4, Mesh, Quaternion, Scene, Texture } from "three";

export type MaterialUpdateParams = {
	[key: string]: unknown;
};

export type IUIComponentProps = {
	props: {
		data: object;
		functions: object;
		refs: object;
	};
};

export type GLTFResult = {
	nodes: {
		[key: string]: Mesh | DirectionalLight; // Index signature for dynamic access
	};
	scene?: Scene;
	materials?: { [key: string]: Material | Material[] };
	animations?: AnimationClip[];
};

export type Uniform = {
	[name: string]:
		| CubeTexture
		| Texture
		| Int32Array
		| Float32Array
		| Matrix4
		| Matrix3
		| Quaternion
		| Vector4
		| Vector3
		| Vector2
		| Color
		| number
		| boolean
		| Array<unknown>
		| null;
};

export type CameraInfo = {
	position: [number, number, number];
	target: [number, number, number];
	azimuthal: number;
	polar: number;
	hdeg2rad: number;
	vdeg2rad: number;
};

type ActionMap = {
	OfficeChair: "idle" | "ChairRotation";
	Robbi: "Idle" | "Idle02" | "sit" | "sit-idle" | "walk" | "wave";
	Macbook: "MacbookOpen";
};

type UsableAction<T extends keyof ActionMap> = ActionMap[T];

type AnimationOptions = {
	loop: boolean;
	loopCount: number;
};

export type AnimationConfig<T extends keyof ActionMap> = {
	action: UsableAction<T>;
	options: AnimationOptions;
};
