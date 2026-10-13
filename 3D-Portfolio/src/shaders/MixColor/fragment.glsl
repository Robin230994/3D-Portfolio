varying vec2 vUv;

uniform vec3 uColorOne;
uniform vec3 uColorTwo;
uniform float uTime;
uniform float uProgress;
uniform float uAspect;


float smoothUnion(float firstShape, float secondShape, float softness) {
	float blend = clamp(0.5 + 0.5 * (secondShape - firstShape) / softness, 0.0, 1.0);
	return mix(secondShape, firstShape, blend) - softness * blend * (1.0 - blend);
}

float splashDistance(vec2 point, vec2 center, float radius, float seed) {
	vec2 localPoint = point - center;
	float angle = atan(localPoint.y, localPoint.x);

	float organicEdge =
		sin(angle * 5.0 + seed) * 0.055 +
		sin(angle * 9.0 - seed * 1.7) * 0.025;

	return length(localPoint) - (radius + organicEdge);
}

void main () {
   	vec2 screenUv = vUv - 0.5;
	screenUv.x *= uAspect;

	float splashOneProgress = smoothstep(0.02, 0.18, uProgress);
	float splashTwoProgress = smoothstep(0.18, 0.34, uProgress);
	float fadeOut = 1.0 - smoothstep(0.82, 1.0, uProgress);

	vec2 colorOnePosition = vec2(-0.16, 0.05);
	vec2 colorTwoPosition = vec2(0.18, -0.04);

	float splashOneRadius = mix(0.01, 0.43, splashOneProgress);
	float splashTwoRadius = mix(0.01, 0.43, splashTwoProgress);

	float splashOne = splashDistance(screenUv, colorOnePosition, splashOneRadius, uTime * 0.8);
	float splashTwo = splashDistance(screenUv, colorTwoPosition, splashTwoRadius, 3.2 + uTime * 0.8);

	float joinedSplash = smoothUnion(splashOne, splashTwo, 0.19);
	float splashAlpha = 1.0 - smoothstep(0.0, 0.018, joinedSplash);

	float colorOneAlpha = 1.0 - smoothstep(0.0, 0.04, splashOne);
	float colorTwoAlpha = 1.0 - smoothstep(0.0, 0.04, splashTwo);

	float colorBlend = colorTwoAlpha / max(colorOneAlpha + colorTwoAlpha, 0.001);

	vec3 splashColor = mix(uColorOne, uColorTwo, colorBlend);

	gl_FragColor = vec4(splashColor, splashAlpha * fadeOut);
}
