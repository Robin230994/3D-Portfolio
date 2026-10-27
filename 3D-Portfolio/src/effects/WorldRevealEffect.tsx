import { BlendFunction, Effect, EffectAttribute } from "postprocessing";
import { Matrix4, Uniform, Vector3 } from "three";
import fragmentShader from "../shaders/WorldReveal/fragment.glsl";
import vertexShader from "../shaders/WorldReveal/vertex.glsl";

const uniforms = new Map<string, Uniform>([
	["uRevealOrigin", new Uniform(new Vector3())],
	["uRadius", new Uniform(0)],
	["uSoftness", new Uniform(0.75)],
	["uCameraProjectionInverse", new Uniform(new Matrix4())],
	["uCameraWorld", new Uniform(new Matrix4())],
]);

export class WorldRevealEffect extends Effect {
	constructor() {
		super("WorldRevealEffect", fragmentShader, {
			blendFunction: BlendFunction.NORMAL,
			attributes: EffectAttribute.DEPTH,
			vertexShader,
			uniforms: uniforms,
		});
	}
}
