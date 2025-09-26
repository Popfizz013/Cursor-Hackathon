import * as THREE from 'three'
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scenePath = '/public/models/earth_cartoon.glb'

export const LoadGLTFByPath = (scene) => {
    return new Promise((resolve, reject) => {
      console.log(`Loading GLTF model from: ${scenePath}`);
      
      // Create a loader
      const loader = new GLTFLoader();
  
      // Load the GLTF file
      loader.load(scenePath, (gltf) => {
        console.log('GLTF loaded successfully:', gltf);
        console.log('Scene children:', gltf.scene.children.length);
        
        // Log information about the loaded model
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            console.log('Found mesh:', child.name, 'with', child.geometry.attributes.position.count, 'vertices');
          }
        });

        scene.add(gltf.scene);

        resolve(gltf.scene);
      }, (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      }, (error) => {
        console.error('Failed to load GLTF model:', error);
        reject(error);
      });
    });
};