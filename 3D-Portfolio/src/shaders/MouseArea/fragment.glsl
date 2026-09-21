varying vec3 vNormal;
varying vec2 vUv;

uniform float uLeft;
uniform float uRight;
uniform float uTop;
uniform float uBottom;
uniform vec2 uMousePosition;
uniform float uEdgeWidth;
uniform vec3 uColor;

void main () {

    // check which side is touched by the mouse
    float leftSide = step(0.9, -vNormal.x);
    float rightSide = step(0.9, vNormal.x);
    float bottomSide = step(0.9, -vNormal.y);
	float topSide = step(0.9, vNormal.y);
    float visible = max(
		max(leftSide * uLeft, rightSide * uRight),
		max(bottomSide * uBottom, topSide * uTop)
	);

    float leftOrRightFace = step(0.9, abs(vNormal.x));

    // calculate the exact position of the mouse to the touched border
    float distanceAlongBorder = mix(
        abs(vUv.x - uMousePosition.x),
        abs(1.0 - vUv.y - uMousePosition.y),
        leftOrRightFace
    );
    float localReveal = 1.0 - smoothstep(0.06, 0.4, distanceAlongBorder);
    float alpha = visible * localReveal ;

    //if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
}
