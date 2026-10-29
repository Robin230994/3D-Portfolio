varying vec2 vUv;

uniform sampler2D uPerlinTexture;
uniform float uTime;

void main() {

    // scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.7;
    smokeUv -= uTime * 0.03;

     //smoke
    float smoke = texture(uPerlinTexture, smokeUv).r;

    // Remap
    smoke = smoothstep(0.4,1.0,smoke);

    float edgeNoise = texture(uPerlinTexture, vec2(vUv.y * 0.35 + 0.2, uTime * 0.015)).r;

    float distanceFromCentre = abs(vUv.x - 0.5) * 2.0;
    float sideFade = 1.0 - smoothstep(0.25, 1.0, distanceFromCentre + (edgeNoise - 0.5) * 0.35);
    float bottomFade = smoothstep(0.0, 0.12, vUv.y);
    float topFade = 1.0 - smoothstep(0.45, 1.0, vUv.y + (edgeNoise - 0.5) * 0.3);

    vec3 warmColor = vec3(0.91, 0.85, 0.76);  // near coffee (slightly warm)
    vec3 coolColor = vec3(1.0, 1.0, 1.0);   // further up (pure steam)
    vec3 smokeColor = mix(warmColor, coolColor, vUv.y);

    float alpha = smoke * sideFade * bottomFade * topFade * 0.6;

    gl_FragColor = vec4(smokeColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}