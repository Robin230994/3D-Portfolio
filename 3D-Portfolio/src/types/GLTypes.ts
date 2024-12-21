import { DirectionalLight, Material, Mesh, Scene } from "three";

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
