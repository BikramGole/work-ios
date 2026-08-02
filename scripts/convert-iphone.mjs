import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'node:fs';
import path from 'node:path';

// Minimal FileReader polyfill for Node (GLTFExporter uses it for Blob -> ArrayBuffer)
globalThis.FileReader = class FileReader {
  constructor() {
    this.result = null;
    this.onloadend = null;
  }
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
};

const BASE = '/home/neo/Projects/work-ios/client/public/models/iphone17';
const PARTS = Array.from({ length: 19 }, (_, i) => path.join(BASE, `model_${i}.obj`));
const loader = new OBJLoader();

const mats = {
  titanium: new THREE.MeshPhysicalMaterial({
    color: 0x1b1b20,
    metalness: 0.9,
    roughness: 0.38,
    clearcoat: 1,
    clearcoatRoughness: 0.25,
  }),
  glassBack: new THREE.MeshPhysicalMaterial({
    color: 0x0d0f18,
    metalness: 0.15,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.94,
  }),
  steel: new THREE.MeshPhysicalMaterial({ color: 0xd8d8dc, metalness: 1, roughness: 0.25 }),
  screw: new THREE.MeshPhysicalMaterial({ color: 0x9a9aa0, metalness: 1, roughness: 0.3 }),
  buttons: new THREE.MeshPhysicalMaterial({ color: 0xcfcfd4, metalness: 1, roughness: 0.28 }),
  frame: new THREE.MeshPhysicalMaterial({ color: 0x3a3a40, metalness: 0.95, roughness: 0.42 }),
  lens: new THREE.MeshPhysicalMaterial({
    color: 0x05060a,
    metalness: 0.2,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.85,
  }),
  screenPanel: new THREE.MeshPhysicalMaterial({
    color: 0x111827,
    emissive: 0x0b1120,
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0,
  }),
};

// Heuristic part -> material (based on geometry dimensions/centers)
const MAP = {
  0: 'glassBack',
  1: 'titanium',
  2: 'buttons',
  3: 'glassBack',
  4: 'frame',
  5: 'lens',
  6: 'titanium',
  7: 'lens',
  8: 'lens',
  9: 'screenPanel',
  10: 'frame',
  11: 'glassBack',
  12: 'screw',
  13: 'screw',
  14: 'steel',
  15: 'lens',
  16: 'lens',
  17: 'lens',
  18: 'lens',
};

const main = new THREE.Group();

for (let i = 0; i < PARTS.length; i++) {
  const obj = loader.parse(fs.readFileSync(PARTS[i], 'utf8'));
  obj.traverse((child) => {
    if (child.isMesh) {
      child.geometry.computeVertexNormals();
      child.material = mats[MAP[i]].clone();
      child.material.name = `mat_part_${i}`;
      child.name = `part_${i}`;
    }
  });
  obj.name = `group_part_${i}`;
  main.add(obj);
}

// Scale so that phone height (~146mm in model units since z ~ 6..7) -> units are ~mm*10
const box = new THREE.Box3().setFromObject(main);
const size = new THREE.Vector3();
box.getSize(size);
console.log('Model size (units):', size.x.toFixed(2), size.y.toFixed(2), size.z.toFixed(2));

const targetItar = Math.max(size.x, size.z);
const unitScale = 1 / targetItar; // normalize longest dimension to 1
main.scale.setScalar(unitScale);

const center = new THREE.Vector3();
box.getCenter(center);
main.position.set(-center.x * unitScale, -center.y * unitScale, -center.z * unitScale);

const exporter = new GLTFExporter();
const glb = await new Promise((resolve, reject) =>
  exporter.parse(main, resolve, reject, { binary: true })
);
fs.writeFileSync(path.join(BASE, 'iphone17.glb'), Buffer.from(glb));
console.log('GLB written:', Math.round(glb.byteLength / 1024), 'KB');