/* eslint-disable react/no-unknown-property */
import React, { Suspense, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const modelPath = `${process.env.PUBLIC_URL}/models/earth_cartoon.glb`;

// One pose per portfolio section; y advances so the globe keeps turning
// forward as the visitor scrolls down the page. Index 2 is the globe's own
// interlude — the hero framing the visitor sees first.
const SECTION_ROTATIONS = [
	{ x: 0.15, y: Math.PI / 5, z: 0 },        // intro (hidden)
	{ x: 0, y: Math.PI / 4, z: 0 },           // skills (hidden)
	{ x: 0.15, y: Math.PI / 5, z: 0 },        // globe interlude — hero pose
	{ x: Math.PI / 6, y: Math.PI / 2, z: 0 }, // experience
	{ x: -Math.PI / 4, y: Math.PI, z: 0 },    // projects
	{ x: 0.1, y: Math.PI * 4 / 3, z: 0 },     // education
	{ x: Math.PI / 8, y: Math.PI * 5 / 3, z: 0 } // contact
];

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
			<mesh scale={modelScale * 1.08} renderOrder={2}>
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

	const modelScale = useMemo(() => (
		deviceType === 'mobile' ? 0.65 : deviceType === 'tablet' ? 0.85 : 1.0
	), [deviceType]);

	useFrame((_, delta) => {
		if (!groupRef.current) return;

		const pose = SECTION_ROTATIONS[section] || SECTION_ROTATIONS[0];
		const drift = reducedMotion ? 0 : progress;
		const target = {
			x: pose.x + drift * 0.2,
			y: pose.y + drift * 0.5,
			z: pose.z + drift * 0.1
		};

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

		// Phones get a slow ambient spin instead of drag.
		if (deviceType === 'mobile' && !reducedMotion) {
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
