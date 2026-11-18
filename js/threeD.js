// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshStandardMaterial({
color: 0x228b22
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// Grid helper (helps visualize movement)
const grid = new THREE.GridHelper(200, 100);
scene.add(grid);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Player
const player = new THREE.Mesh(
new THREE.BoxGeometry(1, 1, 1),
new THREE.MeshStandardMaterial({ color: 0xff0000 })
);

player.position.set(0, 0.5, 0);
scene.add(player);

// Movement settings
const keys = {};

const speed = 0.15;

window.addEventListener("keydown", (event) => {
keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
keys[event.key.toLowerCase()] = false;
});

// Animation loop
function animate() {
requestAnimationFrame(animate);

if (keys["w"] || keys["arrowup"]) {
    player.position.z -= speed;
}

if (keys["s"] || keys["arrowdown"]) {
    player.position.z += speed;
}

if (keys["a"] || keys["arrowleft"]) {
    player.position.x -= speed;
}

if (keys["d"] || keys["arrowright"]) {
    player.position.x += speed;
}

// Camera follows player
camera.position.x = player.position.x;
camera.position.z = player.position.z + 10;
camera.position.y = player.position.y + 5;

camera.lookAt(player.position);

renderer.render(scene, camera);

}

animate();

// Handle browser resizing
window.addEventListener("resize", () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth, window.innerHeight);

});