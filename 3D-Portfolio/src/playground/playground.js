let renderer;
let scene;
let camera;
let box;

function animate() {
	requestAnimationFrame(animate);
	/**
	 * CHALLENGE:
	 * Can you rotate the box?
	 * Access it via the global box variable.
	 */

	// Enter code below this line.

	renderer.render(scene, camera);
}

const run = async () => {
	const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js");
	scene = new THREE.Scene();
	scene.background = new THREE.Color("#222");

	const canvas = document.querySelector("#three-canvas");

	// CAMERA
	camera = new THREE.PerspectiveCamera(45, window.innerWidth, window.innerHeight, 0.1, 100);
	camera.position.set(0, 0, 2.5);

	// WEBGL Renderer
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
	renderer.setPixelRatio(1);
	renderer.setSize(width, height, false);

	// BOX
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxMaterial = new THREE.MeshNormalMaterial();
	box = new THREE.Mesh(boxGeometry, boxMaterial);
	box.rotation.y = Math.PI / 4;
	scene.add(box);

	// Lighting
	const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
	directionalLight.position.set(3, 4, 5);
	scene.add(directionalLight);

	// Animate the sphere
	animate();
};

run();
