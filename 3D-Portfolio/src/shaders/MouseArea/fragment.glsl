varying vec3 vNormal;
varying vec2 vUv;

uniform float uLeft;
uniform float uRight;
uniform float uTop;
uniform float uBottom;
uniform float uEdgeWidth;
uniform vec3 uColor;

void main () {
    float leftSide = step(0.9, -vNormal.x);
    float rightSide = step(0.1, vNormal.x);
    float bottomSide = step(0.9, -vNormal.y);
	float topSide = step(0.9, vNormal.y);
    float visible = max(
		max(leftSide * uLeft, rightSide * uRight),
		max(bottomSide * uBottom, topSide * uTop)
	);

    // fade the edges
    float fadeY = 1.0 - abs(vUv.y - 0.5) * 2.0;
    float fadeX = 1.0 - abs(vUv.x - 0.5) * 2.0;

    // increase the fade on the edges and limit the alpha value to 0.8 so it becomes 0->0.8->0 
    fadeY = pow(fadeY, 2.5) * 0.8;
    fadeX = pow(fadeX, 2.5) * 0.8;

    float leftOrRightFace = step(0.9, abs(vNormal.x));
    float alphaStrength = mix(fadeX, fadeY, leftOrRightFace);

    float alpha = visible * alphaStrength;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
}