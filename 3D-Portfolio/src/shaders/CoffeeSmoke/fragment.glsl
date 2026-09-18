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

    vec3 warmColor = vec3(0.9, 0.85, 0.8);  // near coffee (slightly warm)
    vec3 coolColor = vec3(1.0, 1.0, 1.0);   // further up (pure steam)
    vec3 smokeColor = mix(warmColor, coolColor, vUv.y);

    float alpha = smoke * 0.6; 

    gl_FragColor = vec4(smokeColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}