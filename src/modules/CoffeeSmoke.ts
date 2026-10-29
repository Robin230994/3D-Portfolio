import { ReactThreeFiber } from "@react-three/fiber";
import { CoffeeSmokeMaterial } from "../utils/Materials";

declare module "@react-three/fiber" {
	interface ThreeElements {
		coffeeSmokeMaterial: ReactThreeFiber.Object3DNode<typeof CoffeeSmokeMaterial, typeof CoffeeSmokeMaterial>;
	}
}
