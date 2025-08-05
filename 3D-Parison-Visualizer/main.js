import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color("beige");

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 150, 400);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(50, 125, 0);
controls.update();

scene.add(new THREE.AmbientLight("white", 0.5));

const dirLight = new THREE.DirectionalLight("white", 1);
dirLight.position.set(200, 300, 300);
scene.add(dirLight);

const pointLight = new THREE.PointLight("white", 0.5);
pointLight.position.set(-150, 100, -150);
scene.add(pointLight);

const parisonPoints = [
  { base: 0, value: 12 },
  { base: 50, value: 16 },
  { base: 100, value: 15 },
  { base: 150, value: 19 },
  { base: 200, value: 15 },
  { base: 250, value: 17 }
];

const outerProfile = parisonPoints.map(p => new THREE.Vector2(p.value, p.base));

const thicknessSafety = 0.3;
const minOuterRadius = Math.min(...parisonPoints.map(p => p.value));
const innerRadius = minOuterRadius - thicknessSafety;
const innerProfile = parisonPoints.map(p => new THREE.Vector2(innerRadius, p.base));

const radialSegments = 64;
const outerGeometry = new THREE.LatheGeometry(outerProfile, radialSegments);
const innerGeometry = new THREE.LatheGeometry(innerProfile, radialSegments);
innerGeometry.scale(1, 1, -1);

const outerMaterial = new THREE.MeshStandardMaterial({
  color: "blue",
  transparent: true,
  opacity: 0.45,
  metalness: 0.2,
  roughness: 0.1
});

const innerMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  metalness: 0.1,
  roughness: 0.6,
 
});

const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);

const pipeGroup = new THREE.Group();
pipeGroup.position.x = 50;
pipeGroup.add(outerMesh);
pipeGroup.add(innerMesh);

function createCap(y, outerRadius) {
  const capGeometry = new THREE.BufferGeometry();
  const segments = radialSegments;
  const vertices = [];
  const indices = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const xOuter = outerRadius * cos;
    const zOuter = outerRadius * sin;

    const xInner = innerRadius * cos;
    const zInner = innerRadius * sin;

    vertices.push(xOuter, y, zOuter);
    vertices.push(xInner, y, zInner);
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    indices.push(a, b, d);
    indices.push(a, d, c);
  }

  capGeometry.setIndex(indices);
  capGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  capGeometry.computeVertexNormals();

  return new THREE.Mesh(capGeometry, innerMaterial);
}

const topPoint = parisonPoints[parisonPoints.length - 1];
const bottomPoint = parisonPoints[0];

const topCap = createCap(topPoint.base, topPoint.value);
const bottomCap = createCap(bottomPoint.base, bottomPoint.value);

pipeGroup.add(topCap);
pipeGroup.add(bottomCap);
scene.add(pipeGroup);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
