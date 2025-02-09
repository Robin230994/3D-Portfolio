varying vec2 vUv;

uniform sampler2D uPerlinTexture;
uniform float uTime;

void main() {
    // scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.7;
    smokeUv -= uTime * 0.03;

    // Ensure UVs stay within [0,1] for repeating effect
    smokeUv = fract(smokeUv);

     //smoke
    float smoke = texture(uPerlinTexture, smokeUv).r;

    // Remap
    smoke = smoothstep(0.4,1.0,smoke);

    // Edges
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.9, vUv.y);

    gl_FragColor = vec4(1, 1, 1, smoke);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}