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
	scene.background = new THREE.Color("#dcecff");

	const canvas = document.querySelector("#three-canvas");
	// WEBGL Renderer
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;

	// CAMERA
	camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 10);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 2.2;

	camera.lookAt(0, 0, 0);
	camera.updateProjectionMatrix();

	renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setPixelRatio(window.devicePixelRatio, 2);
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;

	// FLOOR
	const planeGeometry = new THREE.PlaneGeometry(100, 100);
	const planeMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0, metalness: 0 });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI * 0.5;
	plane.position.y = -0.51;
	plane.receiveShadow = true;
	scene.add(plane);

	// BOX
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxMaterial = new THREE.MeshStandardMaterial({ color: "#ff4d3d", roughness: 0.82, metalness: 0 });
	box = new THREE.Mesh(boxGeometry, boxMaterial);
	box.rotation.y = -0.5;
	box.castShadow = true;
	scene.add(box);

	// Lighting
	const ambientLight = new THREE.AmbientLight("0xffffff", 0.35);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight("0x00fffc", 2.5);
	directionalLight.position.set(-2.5, 2, 2);
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.set(1024, 1024);
	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 8;
	directionalLight.shadow.camera.left = -5;
	directionalLight.shadow.camera.right = 5;
	directionalLight.shadow.camera.top = 5;
	directionalLight.shadow.camera.bottom = -5;
	directionalLight.shadow.bias = -0.0001;
	directionalLight.shadow.radius = 12;
	scene.add(directionalLight);

	// Animate the sphere
	animate();
};

run();
