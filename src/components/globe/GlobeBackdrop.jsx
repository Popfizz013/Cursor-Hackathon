/* eslint-disable react/no-unknown-property */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Globe3D from './Globe3D.jsx';
import './GlobeBackdrop.css';

const DRAG_SENSITIVITY = 0.005;
const DRAG_LIMIT = 0.6;

const clamp = (value, limit) => Math.min(Math.max(value, -limit), limit);

const GlobeBackdrop = ({ section, progress, deviceType }) => {
	const dragRef = useRef({ x: 0, y: 0, active: false });
	const lastPointerRef = useRef({ x: 0, y: 0 });
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		setReducedMotion(query.matches);

		const handleChange = (event) => setReducedMotion(event.matches);
		query.addEventListener('change', handleChange);
		return () => query.removeEventListener('change', handleChange);
	}, []);

	const handlePointerDown = useCallback((event) => {
		event.currentTarget.setPointerCapture(event.pointerId);
		dragRef.current.active = true;
		lastPointerRef.current = { x: event.clientX, y: event.clientY };
	}, []);

	const handlePointerMove = useCallback((event) => {
		if (!dragRef.current.active) return;

		const dx = event.clientX - lastPointerRef.current.x;
		const dy = event.clientY - lastPointerRef.current.y;
		lastPointerRef.current = { x: event.clientX, y: event.clientY };

		dragRef.current.y = clamp(dragRef.current.y + dx * DRAG_SENSITIVITY, DRAG_LIMIT);
		dragRef.current.x = clamp(dragRef.current.x + dy * DRAG_SENSITIVITY, DRAG_LIMIT);
	}, []);

	const handlePointerEnd = useCallback((event) => {
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
		dragRef.current.active = false;
	}, []);

	return (
		<div className="globe-backdrop" aria-hidden="true">
			<Canvas
				gl={{ alpha: true, antialias: true }}
				camera={{
					position: [0, 0, 3],
					fov: deviceType === 'mobile' ? 70 : 55
				}}
				dpr={[1, deviceType === 'desktop' ? 1.5 : 1.1]}
				onCreated={({ gl, scene }) => {
					gl.setClearColor(0x000000, 0);
					scene.background = null;
				}}
			>
				<ambientLight intensity={0.5} />
				<directionalLight position={[4, 5, 3]} intensity={1} color="#9ecfff" />
				<pointLight position={[-4, 3, 5]} intensity={0.6} color="#6aa7ff" />
				<Globe3D
					deviceType={deviceType}
					section={section}
					progress={progress}
					dragRef={dragRef}
					reducedMotion={reducedMotion}
				/>
			</Canvas>
			<div
				className="globe-backdrop__hotspot"
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerEnd}
				onPointerCancel={handlePointerEnd}
			/>
		</div>
	);
};

export default GlobeBackdrop;
