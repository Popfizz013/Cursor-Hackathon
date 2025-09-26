import * as THREE from 'three'
import { LoadGLTFByPath } from './Helpers/ModelHelper.js'

//Renderer does the job of rendering the graphics
let renderer = new THREE.WebGLRenderer({

	//Defines the canvas component in the DOM that will be used
	canvas: document.querySelector('#background'),
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

//set up the renderer with the default settings for threejs.org/editor - revision r153
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1
renderer.useLegacyLights  = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
//make sure three/build/three.module.js is over r152 or this feature is not available. 
renderer.outputColorSpace = THREE.SRGBColorSpace 

const scene = new THREE.Scene();

let cameraList = [];

let camera;
let globeModel = null; // Reference to the loaded globe model
let scrollRotation = 0; // Track scroll-based rotation (disabled)

// Add lighting to the scene so we can see the model
const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Add a basic camera as fallback
const fallbackCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
fallbackCamera.position.set(0, 0, 5);
scene.add(fallbackCamera);

// Load the GLTF model
LoadGLTFByPath(scene)
  .then((loadedModel) => {
    console.log('Model loaded successfully!');
    globeModel = loadedModel; // Store reference to the globe model
    retrieveListOfCameras(scene);
  })
  .catch((error) => {
    console.error('Error loading GLTF model:', error);
    // Use fallback camera if model loading fails
    camera = fallbackCamera;
    animate();
  });

//retrieve list of all cameras
function retrieveListOfCameras(scene){
  // Get a list of all cameras in the scene
  scene.traverse(function (object) {
    if (object.isCamera) {
      cameraList.push(object);
    }
  });

  console.log(`Found ${cameraList.length} cameras in the model`);

  //Set the camera to the first value in the list of cameras, or use fallback
  if (cameraList.length > 0) {
    camera = cameraList[0];
    console.log('Using camera from model');
  } else {
    camera = fallbackCamera;
    console.log('No cameras found in model, using fallback camera');
  }

  updateCameraAspect(camera);

  // Position camera to view the model better
  if (camera === fallbackCamera) {
    // Calculate bounding box of the model to position camera appropriately
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 1.5; // Add some margin
    
    camera.position.set(center.x, center.y, center.z + cameraZ);
    camera.lookAt(center);
  }

  // Scroll-based rotation disabled; allow default zoom/scroll behavior

  // Start the animation loop after the model and cameras are loaded
  animate();
}

// Set the camera aspect ratio to match the browser window dimensions
function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// Scroll rotation removed

//A method to be run each time a frame is generated
function animate() {
  requestAnimationFrame(animate);

  // Apply scroll-based rotation to the globe
  if (globeModel) {
    globeModel.rotation.y = scrollRotation;
  }

  renderer.render(scene, camera);
};




    