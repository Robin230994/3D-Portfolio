varying vec2 vUv;
varying vec3 vPosition;

uniform vec3 uColor;
uniform float uIntensity;
uniform float uRayCount;

#define PI 3.14159265359


void main() {
    float repeatedUv = fract(vUv.y * uRayCount);
    float rayPattern = sin(repeatedUv * PI);

    // Soft left/right boundaries of this face.
    float sideEdgeFade = sin(vUv.x * PI);
    // Soft top/bottom boundaries of the complete face.
    float topFade = smoothstep(0.0, 0.15, vUv.y);
    float bottomFade = 1.0 - smoothstep(0.85, 1.0, vUv.y);
    float topBottomFade = topFade * bottomFade;
    float alpha = rayPattern * sideEdgeFade * topBottomFade * uIntensity;
    gl_FragColor = vec4(uColor, alpha);
}