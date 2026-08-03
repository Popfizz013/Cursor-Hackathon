/* eslint-disable react/no-unknown-property */
import React, { Suspense, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
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
// a slow dive that lands fully zoomed on the first of the GLB's two city
// clusters and HOLDS, a hop (pull back, swing west) to the second city
// with another hold, then a full pull-out whose end pose hands off to the
// Experience backdrop. Duplicate keyframes are the pauses. Poses aim the
// cartoon cities, not real geodesy — tuned by eye against the GLB.
const FLIGHT_KEYFRAMES = [
	{ p: 0, x: 0.15, y: Math.PI / 5, z: 0, camZ: 3 },     // wide hero framing
	{ p: 0.26, x: 0.275, y: 0.02, z: 0, camZ: 1.28 },     // dive: city one
	{ p: 0.4, x: 0.275, y: 0.02, z: 0, camZ: 1.28 },      // hold on city one
	{ p: 0.55, x: 0.36, y: 0.35, z: 0, camZ: 1.7 },       // hop apex: low arc
	{ p: 0.68, x: 0.44, y: 0.68, z: 0, camZ: 1.28 },      // descend: city two
	{ p: 0.82, x: 0.44, y: 0.68, z: 0, camZ: 1.28 },      // hold on city two
	{ p: 1, x: Math.PI / 6, y: Math.PI / 2, z: 0, camZ: 3 } // pull out to hero framing
];

const smoothstep = (t) => t * t * (3 - 2 * t);

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
	const glassRef = useRef();

	// The glass shell reads as sheen at a distance but fogs the surface at
	// close range — hide it while the flight is diving.
	useFrame((state) => {
		if (glassRef.current) {
			glassRef.current.visible = state.camera.position.z > 2.05;
		}
	});

	const clonedScene = useMemo(() => {
		if (!scene) return null;

		const clone = scene.clone(true);
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
			{/* Glass shell — the planet sealed in a marble */}
			<mesh ref={glassRef} scale={modelScale * 1.08} renderOrder={2}>
				<sphereGeometry args={[1, 32, 32]} />
				<MeshTransmissionMaterial
					thickness={0.18}
					transmission={0.92}
					anisotropy={0.18}
					chromaticAberration={0.04}
					roughness={0.12}
					clearcoat={0.9}
					clearcoatRoughness={0.12}
					backside={false}
				/>
			</mesh>
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
