varying vec3 vWorldPos;

void main() {
    // calculate absolute position in 3D space
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}