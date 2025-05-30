import { Color, Vector2 } from "three";
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
	materials?: { [key: string]: Material };
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
