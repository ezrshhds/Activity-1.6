import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Cube geometry and material
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Window size update
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Fullscreen functionality
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Mouse control
let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;

window.addEventListener('mousedown', () => {
    isMouseDown = true;
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

window.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        mouseX = (event.clientX / sizes.width) * 2 - 1;
        mouseY = (event.clientY / sizes.height) * 2 - 1; // Reverse y-axis
    }
});

// Create clock for time-based animations
const clock = new THREE.Clock();

// Animation loop
const tick = () => {
    // Get elapsed time
    const elapsedTime = clock.getElapsedTime();

    // Cube rotation based on mouse position
    mesh.rotation.y = mouseX * Math.PI; // Horizontal mouse movement
    mesh.rotation.x = mouseY * Math.PI; // Vertical mouse movement

    // Render
    renderer.render(scene, camera);

    // Call next frame
    window.requestAnimationFrame(tick);
};

tick();
