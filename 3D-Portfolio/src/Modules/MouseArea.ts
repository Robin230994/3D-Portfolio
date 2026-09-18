import { ReactThreeFiber } from "@react-three/fiber";
import { MouseAreaShaderMaterial } from "../Helper/GLMaterials";

declare module "@react-three/fiber" {
	interface ThreeElements {
		mouseAreaShaderMaterial: ReactThreeFiber.Object3DNode<typeof MouseAreaShaderMaterial, typeof MouseAreaShaderMaterial>;
	}
}
