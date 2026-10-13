import { ReactThreeFiber } from "@react-three/fiber";
import { MixColorShaderMaterial } from "../utils/Materials";

declare module "@react-three/fiber" {
	interface ThreeElements {
		mixColorShaderMaterial: ReactThreeFiber.Object3DNode<typeof MixColorShaderMaterial, typeof MixColorShaderMaterial>;
	}
}
