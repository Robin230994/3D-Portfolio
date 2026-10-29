import { ReactThreeFiber } from "@react-three/fiber";
import { WorldRevealShaderMaterial } from "../utils/Materials";

declare module "@react-three/fiber" {
	interface ThreeElements {
		worldRevealShaderMaterial: ReactThreeFiber.Object3DNode<typeof WorldRevealShaderMaterial, typeof WorldRevealShaderMaterial>;
	}
}
