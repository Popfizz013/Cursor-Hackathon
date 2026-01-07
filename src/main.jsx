import * as THREE from 'three'
import { LoadGLTFByPath } from './helpers/model/ModelHelper.jsx'

let renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#background'),
	antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1
renderer.useLegacyLights  = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace 

const scene = new THREE.Scene();

let cameraList = [];

let camera;
let globeModel = null;
let scrollRotation = 0;

const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

const fallbackCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
fallbackCamera.position.set(0, 0, 5);
scene.add(fallbackCamera);

LoadGLTFByPath(scene)
	.then((loadedModel) => {
		console.log('Model loaded successfully!');
		globeModel = loadedModel;
		retrieveListOfCameras(scene);
	})
	.catch((error) => {
		console.error('Error loading GLTF model:', error);
		camera = fallbackCamera;
		animate();
	});

function retrieveListOfCameras(scene){
	scene.traverse(function (object) {
		if (object.isCamera) {
			cameraList.push(object);
		}
	});

	console.log(`Found ${cameraList.length} cameras in the model`);

	if (cameraList.length > 0) {
		camera = cameraList[0];
		console.log('Using camera from model');
	} else {
		camera = fallbackCamera;
		console.log('No cameras found in model, using fallback camera');
	}

	updateCameraAspect(camera);

	if (camera === fallbackCamera) {
		const box = new THREE.Box3().setFromObject(scene);
		const center = box.getCenter(new THREE.Vector3());
		const size = box.getSize(new THREE.Vector3());
		const maxDim = Math.max(size.x, size.y, size.z);
		const fov = camera.fov * (Math.PI / 180);
		let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
		cameraZ *= 1.5;
    
		camera.position.set(center.x, center.y, center.z + cameraZ);
		camera.lookAt(center);
	}

	animate();
}

function updateCameraAspect(camera) {
	const width = window.innerWidth;
	const height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}

function animate() {
	requestAnimationFrame(animate);

	if (globeModel) {
		globeModel.rotation.y = scrollRotation;
	}

	renderer.render(scene, camera);
};
