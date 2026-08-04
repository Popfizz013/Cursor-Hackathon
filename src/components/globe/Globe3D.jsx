/* eslint-disable react/no-unknown-property */
import React, { Suspense, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const modelPath = `${process.env.PUBLIC_URL}/models/earth_cartoon.glb`;

// One pose per portfolio section; y advances so the globe keeps turning
// forward as the visitor scrolls down the page. Index 2 is the globe's own
// interlude, where scroll scrubs the camera flight below instead.
const SECTION_ROTATIONS = [
	{ x: 0.15, y: Math.PI / 5, z: 0 },        // intro (hidden)
	{ x: 0, y: Math.PI / 4, z: 0 },           // skills (hidden)
	{ x: Math.PI / 6, y: Math.PI / 2, z: 0 }, // globe interlude tail (= flight end pose)
	{ x: Math.PI / 6, y: Math.PI / 2, z: 0 }, // experience
	{ x: -Math.PI / 4, y: Math.PI, z: 0 },    // projects
	{ x: 0.1, y: Math.PI * 4 / 3, z: 0 },     // education
	{ x: Math.PI / 8, y: Math.PI * 5 / 3, z: 0 } // contact
];

const INTERLUDE_SECTION = 2;
const DEFAULT_CAMERA_Z = 3;

// The interlude flight, scrubbed by progress through the 400vh runway:
// a slow dive that lands fully zoomed on city2 ("Victoria") and HOLDS, a
// hop north to city1 ("Canada") with another hold, then a full pull-out
// whose end pose hands off to the Experience backdrop. Duplicate keyframes
// are the pauses. The x/y values for the two stops come straight from the
// [city] console log — update them whenever CITY_POSITIONS changes.
const FLIGHT_KEYFRAMES = [
	{ p: 0, x: 0.15, y: Math.PI / 5, z: 0, camZ: 3 },     // wide hero framing
	{ p: 0.26, x: 0.559, y: 0.157, z: 0, camZ: 1.28 },    // dive: city2 = Ottawa
	{ p: 0.4, x: 0.559, y: 0.157, z: 0, camZ: 1.28 },     // hold on Ottawa
	{ p: 0.55, x: 0.646, y: 0.436, z: 0, camZ: 1.7 },     // hop apex: low arc
	{ p: 0.68, x: 0.733, y: 0.716, z: 0, camZ: 1.28 },    // descend: city1 = Victoria
	{ p: 0.82, x: 0.733, y: 0.716, z: 0, camZ: 1.28 },    // hold on Victoria
	{ p: 1, x: Math.PI / 6, y: Math.PI / 2, z: 0, camZ: 3 } // pull out to hero framing
];

// Card shown while the camera holds over each city. The windows bracket the
// hold keyframes above (0.26–0.40 and 0.68–0.82), opening as the descent
// finishes and closing as the camera leaves.
export const FLIGHT_STOPS = [
	{
		id: 'ottawa',
		from: 0.24,
		to: 0.46,
		place: 'Ottawa, ON',
		roles: [
			{
				org: 'National Research Council',
				title: 'Full-Stack Developer Co-op',
				when: 'May – Sept 2025',
				detail: 'Built staff-portal features in React and Node, extended C# middleware over SQL, and improved an NLP model with a multi-task approach in PyTorch.'
			},
			{
				org: 'Advanced Symbolics',
				title: 'Support Engineer Intern',
				when: 'May – Aug 2023',
				detail: 'Triaged code failures to root cause and wrote Python tooling across Apache Airflow, AWS and MongoDB.'
			}
		]
	},
	{
		id: 'victoria',
		from: 0.66,
		to: 0.88,
		place: 'Victoria, BC',
		roles: [
			{
				org: 'ACIS Lab',
				title: 'Robotics Security Intern',
				when: 'Sept 2025 – Present',
				detail: 'Researching ROS 2 security across DDS and SROS2 — configuring policies, keystores and enclaves, simulating command-injection attacks, and measuring the latency each mitigation costs.'
			},
			{
				org: 'University of Victoria',
				title: 'Teaching Assistant',
				when: 'Sept 2025 – April 2026',
				detail: 'Lead CSC105 labs twice a week, plus grading and exam invigilation across the semester.'
			}
		]
	}
];

const smoothstep = (t) => t * t * (3 - 2 * t);

// ── EDIT ME: where the two flight cities sit on the globe ───────────────
// Absolute coordinates, in degrees. lat: + is north (up), − is south.
// lon: + slides the city east, − west (lon 0 faces the camera at pose 0).
// Only the two designated clusters move — every other town in the mesh
// stays where the artist put it. The console prints a [city] line per
// city on every reload with the resulting lat/lon and the exact pose to
// paste into the flight keyframes to centre that city on screen.
const CITY_POSITIONS = {
	city1: { lat: 42, lon: -41 },  // "Canada" — deep in the northern snow band
	city2: { lat: 32, lon: -9 }   // "Victoria" — green land near the west coast
};

const degToRad = (d) => (d * Math.PI) / 180;


// The model keeps ALL its building clusters in one mesh, so repositioning a
// city means moving its vertices. Splits the mesh into spatially connected
// clusters (flood fill: buildings within one town touch, towns are far
// apart), designates the cluster nearest the node anchor as city1 and the
// largest remaining one as city2, and rotates ONLY those two about the
// globe centre onto their CITY_POSITIONS targets. Geometry is cloned before
// mutation so the GLTF cache stays pristine across remounts.
const CLUSTER_LINK_DIST = 0.15; // globe units; buildings in a town touch, towns don't

const liftCities = (clone) => {
	const node = clone.getObjectByName('edificio001_30');
	if (!node) return;

	let mesh = null;
	node.traverse((child) => {
		if (child.isMesh && !mesh) mesh = child;
	});
	if (!mesh || !mesh.geometry) return;

	clone.updateMatrixWorld(true);
	const toGlobe = mesh.matrixWorld.clone();
	const toLocal = toGlobe.clone().invert();

	const geometry = mesh.geometry.clone();
	mesh.geometry = geometry;
	const position = geometry.getAttribute('position');

	// Globe-space copies of every vertex
	const verts = [];
	const v = new THREE.Vector3();
	for (let i = 0; i < position.count; i++) {
		verts.push(v.fromBufferAttribute(position, i).applyMatrix4(toGlobe).clone());
	}

	// Connected components: flood-fill by proximity
	const linkSq = CLUSTER_LINK_DIST * CLUSTER_LINK_DIST;
	const clusterOf = new Array(verts.length).fill(-1);
	let clusterCount = 0;
	for (let i = 0; i < verts.length; i++) {
		if (clusterOf[i] !== -1) continue;
		const queue = [i];
		clusterOf[i] = clusterCount;
		while (queue.length) {
			const a = queue.pop();
			for (let b = 0; b < verts.length; b++) {
				if (clusterOf[b] === -1 && verts[a].distanceToSquared(verts[b]) < linkSq) {
					clusterOf[b] = clusterCount;
					queue.push(b);
				}
			}
		}
		clusterCount++;
	}

	const centroids = Array.from({ length: clusterCount }, () => new THREE.Vector3());
	const counts = new Array(clusterCount).fill(0);
	verts.forEach((p, i) => {
		centroids[clusterOf[i]].add(p);
		counts[clusterOf[i]]++;
	});
	centroids.forEach((c, k) => c.divideScalar(counts[k] || 1));

	// The flight cities are the two largest TIGHT towns (100–300 verts).
	// Anything bigger is a sprawling hamlet-chain that reads as scattered
	// buildings when zoomed — leave those (and the tiny ones) untouched.
	const candidates = centroids
		.map((c, k) => k)
		.filter((k) => counts[k] >= 100 && counts[k] <= 300)
		.sort((a, b) => counts[b] - counts[a]);
	const city1Idx = candidates.length > 0 ? candidates[0] : -1;
	const city2Idx = candidates.length > 1 ? candidates[1] : -1;

	const targetDir = ({ lat, lon }) => new THREE.Vector3(
		Math.cos(degToRad(lat)) * Math.sin(degToRad(lon)),
		Math.sin(degToRad(lat)),
		Math.cos(degToRad(lat)) * Math.cos(degToRad(lon))
	);
	const rotateOnto = (centroid, cityCfg) => new THREE.Quaternion()
		.setFromUnitVectors(centroid.clone().normalize(), targetDir(cityCfg));

	const rotations = new Array(clusterCount).fill(null);
	if (city1Idx !== -1) rotations[city1Idx] = rotateOnto(centroids[city1Idx], CITY_POSITIONS.city1);
	if (city2Idx !== -1) rotations[city2Idx] = rotateOnto(centroids[city2Idx], CITY_POSITIONS.city2);

	verts.forEach((p, i) => {
		const q = rotations[clusterOf[i]];
		if (q) p.applyQuaternion(q);
		p.applyMatrix4(toLocal);
		position.setXYZ(i, p.x, p.y, p.z);
	});
	position.needsUpdate = true;
	geometry.computeVertexNormals();
};

const sampleFlight = (progress) => {
	const frames = FLIGHT_KEYFRAMES;
	let a = frames[0];
	let b = frames[frames.length - 1];
	for (let i = 0; i < frames.length - 1; i++) {
		if (progress >= frames[i].p && progress <= frames[i + 1].p) {
			a = frames[i];
			b = frames[i + 1];
			break;
		}
	}
	const span = b.p - a.p || 1;
	const t = smoothstep((progress - a.p) / span);
	return {
		x: a.x + (b.x - a.x) * t,
		y: a.y + (b.y - a.y) * t,
		z: a.z + (b.z - a.z) * t,
		camZ: a.camZ + (b.camZ - a.camZ) * t
	};
};

// Low-poly stand-in: rendered on mobile, and as the Suspense fallback
// while the GLB streams in on desktop/tablet.
const SimpleGlobe = ({ modelScale }) => (
	<>
		<mesh scale={modelScale * 0.95}>
			<icosahedronGeometry args={[1, 2]} />
			<meshStandardMaterial color="#4da1ff" metalness={0.25} roughness={0.4} />
		</mesh>
		<mesh scale={modelScale * 1.1}>
			<icosahedronGeometry args={[1, 3]} />
			<meshBasicMaterial color="#87ceeb" transparent opacity={0.1} side={THREE.BackSide} />
		</mesh>
	</>
);

const DetailedGlobe = ({ modelScale, deviceType }) => {
	const { scene } = useGLTF(modelPath);

	const clonedScene = useMemo(() => {
		if (!scene) return null;

		const clone = scene.clone(true);

		// Every town lives in ONE mesh (edificio001_30); liftCities relocates
		// just the two flight cities to their CITY_POSITIONS lat/lon (top of
		// this file — edit those two lines to move them).
		liftCities(clone);

		clone.traverse((child) => {
			if (child.isMesh) {
				child.renderOrder = 1;
				if (child.material) {
					const material = child.material.clone ? child.material.clone() : child.material;
					// Keep the earth crisp beneath the glass shell — an earlier
					// version washed out when these defaults were left loose.
					material.depthWrite = true;
					material.depthTest = true;
					material.transparent = false;
					material.side = THREE.FrontSide;
					child.material = material;
				}
				if (child.geometry) {
					child.geometry.computeVertexNormals();
				}
			}
		});

		return clone;
	}, [scene]);

	const outlineMaterial = useMemo(() => (
		new THREE.MeshBasicMaterial({
			color: '#0b1d3b',
			side: THREE.BackSide,
			transparent: true,
			opacity: 0.1,
			depthWrite: false
		})
	), []);

	return (
		<>
			{clonedScene && (
				<primitive object={clonedScene} scale={modelScale} position={[0, 0, 0]} />
			)}
			{/* Faint navy atmospheric rim, desktop only */}
			{deviceType === 'desktop' && (
				<mesh scale={modelScale * 1.02} renderOrder={0}>
					<sphereGeometry args={[1, 32, 32]} />
					<primitive object={outlineMaterial} attach="material" />
				</mesh>
			)}
		</>
	);
};

const Globe3D = ({ deviceType, section, progress, dragRef, reducedMotion }) => {
	const groupRef = useRef();
	const baseRotationRef = useRef({ x: 0.15, y: Math.PI / 5, z: 0 });
	const spinRef = useRef(0);
	const runwayElRef = useRef(null);

	const modelScale = useMemo(() => (
		deviceType === 'mobile' ? 0.65 : deviceType === 'tablet' ? 0.85 : 1.0
	), [deviceType]);

	// Where we are relative to the interlude's scroll runway. progress is 0
	// when the section top reaches the viewport top (= the moment the globe
	// pins centred) and 1 when its bottom meets the viewport bottom.
	const measureRunway = () => {
		if (!runwayElRef.current || !runwayElRef.current.isConnected) {
			runwayElRef.current = document.querySelector('.globe-section');
		}
		const el = runwayElRef.current;
		if (!el) return null;
		const rect = el.getBoundingClientRect();
		const span = rect.height - window.innerHeight;
		if (span <= 0) return null;
		return {
			approaching: rect.top > 0,
			progress: Math.min(Math.max(-rect.top / span, 0), 1)
		};
	};

	useFrame((state, delta) => {
		if (!groupRef.current) return;

		let target;
		let cameraTargetZ = DEFAULT_CAMERA_Z;

		// The flight is keyed to runway geometry, NOT the detected section —
		// section detection flips late, which used to start the dive with a
		// lurch. The animation begins the moment the globe pins centred.
		const runway = measureRunway();

		if (runway && runway.approaching) {
			// Sliding in with the section: hold the flight's start pose so the
			// globe arrives centred, composed, and only then begins to move.
			const start = FLIGHT_KEYFRAMES[0];
			target = { x: start.x, y: start.y, z: start.z };
		} else if (runway && runway.progress < 1) {
			// Pinned: scroll scrubs the flight; the damped spring keeps it silky.
			const flight = sampleFlight(runway.progress);
			target = { x: flight.x, y: flight.y, z: flight.z };
			if (!reducedMotion) {
				cameraTargetZ = flight.camZ;
			}
		} else {
			const pose = SECTION_ROTATIONS[section] || SECTION_ROTATIONS[0];
			const drift = reducedMotion ? 0 : progress;
			target = {
				x: pose.x + drift * 0.2,
				y: pose.y + drift * 0.5,
				z: pose.z + drift * 0.1
			};
		}

		state.camera.position.z = THREE.MathUtils.damp(
			state.camera.position.z,
			cameraTargetZ,
			6,
			delta
		);

		// Damped spring toward the section pose — settles, never snaps.
		const base = baseRotationRef.current;
		base.x = THREE.MathUtils.damp(base.x, target.x, 6, delta);
		base.y = THREE.MathUtils.damp(base.y, target.y, 6, delta);
		base.z = THREE.MathUtils.damp(base.z, target.z, 6, delta);

		// Drag nudges decay gently back to the framed pose once released.
		const drag = dragRef?.current;
		let offsetX = 0;
		let offsetY = 0;
		if (drag) {
			if (!drag.active) {
				drag.x = THREE.MathUtils.damp(drag.x, 0, 0.8, delta);
				drag.y = THREE.MathUtils.damp(drag.y, 0, 0.8, delta);
			}
			offsetX = drag.x;
			offsetY = drag.y;
		}

		// Phones get a slow ambient spin instead of drag — paused during the
		// interlude so it doesn't fight the scripted flight.
		if (deviceType === 'mobile' && !reducedMotion && section !== INTERLUDE_SECTION) {
			spinRef.current += delta * 0.12;
		}

		groupRef.current.rotation.x = base.x + offsetX;
		groupRef.current.rotation.y = base.y + offsetY + spinRef.current;
		groupRef.current.rotation.z = base.z;
	});

	return (
		<group ref={groupRef}>
			{deviceType === 'mobile' ? (
				<SimpleGlobe modelScale={modelScale} />
			) : (
				<Suspense fallback={<SimpleGlobe modelScale={modelScale} />}>
					<DetailedGlobe modelScale={modelScale} deviceType={deviceType} />
				</Suspense>
			)}
		</group>
	);
};

export default Globe3D;
