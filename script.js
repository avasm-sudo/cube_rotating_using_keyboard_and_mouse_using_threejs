// Global variables
let scene, camera, renderer, cube;
let cubePosition = new THREE.Vector3(0, 0, 0);
let targetPosition = new THREE.Vector3(0, 0, 0);
let isAnimating = false;

// Initialize the scene
function init() {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  // Create a cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Register event listeners
  document.addEventListener("keydown", onKeyDown, false);
  document.getElementById("arrow-up").addEventListener("click", moveUp, false);
  document.getElementById("arrow-down").addEventListener("click", moveDown, false);
  document.getElementById("arrow-left").addEventListener("click", moveLeft, false);
  document.getElementById("arrow-right").addEventListener("click", moveRight, false);
}

// Key down event handler
function onKeyDown(event) {
  if (isAnimating) return;

  const currentPosition = cubePosition.clone();

  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
  }

  if (!currentPosition.equals(targetPosition)) {
    animateCube(currentPosition, targetPosition);
  }
}

// Move cube upwards
function moveUp() {
  if (isAnimating) return;

  const currentPosition = cubePosition.clone();
  targetPosition.copy(currentPosition);
  targetPosition.y += 1;

  if (!currentPosition.equals(targetPosition)) {
    animateCube(currentPosition, targetPosition);
  }
}

// Move cube downwards
function moveDown() {
  if (isAnimating) return;

  const currentPosition = cubePosition.clone();
  targetPosition.copy(currentPosition);
  targetPosition.y -= 1;

  if (!currentPosition.equals(targetPosition)) {
    animateCube(currentPosition, targetPosition);
  }
}

// Move cube to the left
function moveLeft() {
  if (isAnimating) return;

  const currentPosition = cubePosition.clone();
  targetPosition.copy(currentPosition);
  targetPosition.x -= 1;

  if (!currentPosition.equals(targetPosition)) {
    animateCube(currentPosition, targetPosition);
  }
}

// Move cube to the right
function moveRight() {
  if (isAnimating) return;

  const currentPosition = cubePosition.clone();
  targetPosition.copy(currentPosition);
  targetPosition.x += 1;

  if (!currentPosition.equals(targetPosition)) {
    animateCube(currentPosition, targetPosition);
  }
}

// Animate the cube movement
function animateCube(startPosition, endPosition) {
  isAnimating = true;
  const duration = 1000; // Animation duration in milliseconds
  const startTimestamp = Date.now();

  function updateCubePosition() {
    const elapsed = Date.now() - startTimestamp;
    const progress = Math.min(elapsed / duration, 1);
    cubePosition.lerpVectors(startPosition, endPosition, progress);

    cube.position.copy(cubePosition);
    renderer.render(scene, camera);

    if (progress < 1) {
      requestAnimationFrame(updateCubePosition);
    } else {
      isAnimating = false;
    }
  }

  requestAnimationFrame(updateCubePosition);
}

// Add event listener for mouse movement
document.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
  // Rotate the cube based on mouse position
  cube.rotation.x = event.clientY / window.innerHeight;
  cube.rotation.y = event.clientX / window.innerWidth;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Call the initialization function and start the animation loop
init();
animate();
