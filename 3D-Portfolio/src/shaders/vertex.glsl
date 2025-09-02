uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

#include ./includes/rotate2D.glsl


void main() {
    vec3 newPosition = position;

    //Twist
    float swirl = texture(uPerlinTexture, vec2(uv.y * 0.5, uTime * 0.05)).r;
    float angle = (swirl - 0.5) * 0.6 * uv.y; 
    newPosition.xz = rotate2D(newPosition.xz, angle);


    // Wind
    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(0.2, uTime * 0.02)).r - 0.5,
        texture(uPerlinTexture, vec2(0.8, uTime * 0.02)).r - 0.5
    );
    windOffset *= pow(uv.y, 2.0) * 0.05; // much smaller than before
    newPosition.xz += windOffset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
}