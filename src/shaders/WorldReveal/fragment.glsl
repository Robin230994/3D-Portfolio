uniform vec3 uRevealCenter;
uniform float uRadius;
uniform float uSoftness;

varying vec3 vWorldPos;

void main() {
    // Calculate distance between pixel world position and reveal center.
    float dist = distance(vWorldPos, uRevealCenter);

    // When distance is bigger than the circles radius discard the pixel;
    if (dist > uRadius) {
        discard;
    }

    // Soften the edges of the circle
    float alpha = 1.0 - smoothstep(uRadius - uSoftness, uRadius, dist);

    gl_FragColor = vec4(1.0, 0.0, 0.0, alpha);
}