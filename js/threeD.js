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
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({
color: 0x228b22
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// Grid helper (helps visualize movement)
const grid = new THREE.GridHelper(50, 50);
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




// // Animation loop
function animate() {
    requestAnimationFrame(animate);

    const moveSpeed = 0.15;
    const turnSpeed = 0.04;

    // Turn left and right
    if (keys["a"] || keys["arrowleft"]) {
        player.rotation.y += turnSpeed;
    }

    if (keys["d"] || keys["arrowright"]) {
        player.rotation.y -= turnSpeed;
    }

    // Move forward and backward
    if (keys["w"] || keys["arrowup"]) {
        player.translateZ(-moveSpeed);
    }

    if (keys["s"] || keys["arrowdown"]) {
        player.translateZ(moveSpeed);
    }

    // Ground boundaries
    player.position.x = Math.max(-25, Math.min(25, player.position.x));
    player.position.z = Math.max(-25, Math.min(25, player.position.z));

    // Camera follows player rotation
    const cameraOffset = new THREE.Vector3(0, 5, 10);

    const rotatedOffset = cameraOffset.clone()
        .applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            player.rotation.y
        );

    camera.position.copy(player.position).add(rotatedOffset);

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