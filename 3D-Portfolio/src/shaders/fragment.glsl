varying vec2 vUv;
uniform sampler2D uPerlinTexture;
uniform float uTime;

void main() {
    // scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv -= uTime * 0.03;

     //smoke
    float smoke = texture(uPerlinTexture, smokeUv).r;

    gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
}