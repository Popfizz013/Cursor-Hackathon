/* eslint-disable react/no-unknown-property */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Globe3D, { FLIGHT_STOPS } from './Globe3D.jsx';
import './GlobeBackdrop.css';

const DRAG_SENSITIVITY = 0.005;
const DRAG_LIMIT = 0.6;

// The globe's own interlude section (between Skills and Experience). No
// fade-in: the wrapper is translated by the interlude's top edge so the
// globe scrolls in WITH its section, pins for the flight, then stays on
// as a dimmed backdrop behind the content sections that follow.
const INTERLUDE_SECTION = 2;

const clamp = (value, limit) => Math.min(Math.max(value, -limit), limit);

const GlobeBackdrop = ({ section, progress, deviceType }) => {
	const wrapperRef = useRef(null);
	const runwayElRef = useRef(null);
	const frameRef = useRef(null);
	const dragRef = useRef({ x: 0, y: 0, active: false });
	const lastPointerRef = useRef({ x: 0, y: 0 });
	const [reducedMotion, setReducedMotion] = useState(false);
	const [activeStop, setActiveStop] = useState(null);

	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		setReducedMotion(query.matches);

		const handleChange = (event) => setReducedMotion(event.matches);
		query.addEventListener('change', handleChange);
		return () => query.removeEventListener('change', handleChange);
	}, []);

	// Anchor the fixed wrapper to the interlude while approaching it: offset
	// by the section's top edge (never negative), so it rides the page until
	// the runway starts, then pins. Direct style mutation — no re-renders.
	// The same pass picks the city card to show, so the overlay needs no
	// listener of its own and only re-renders when the active stop changes.
	useEffect(() => {
		const place = () => {
			frameRef.current = null;
			if (!wrapperRef.current) return;
			if (!runwayElRef.current || !runwayElRef.current.isConnected) {
				runwayElRef.current = document.querySelector('.globe-section');
			}
			const el = runwayElRef.current;
			const rect = el ? el.getBoundingClientRect() : null;
			const top = rect ? Math.max(rect.top, 0) : 0;
			wrapperRef.current.style.transform = `translateY(${top}px)`;

			let stop = null;
			if (rect) {
				const span = rect.height - window.innerHeight;
				if (span > 0) {
					const p = Math.min(Math.max(-rect.top / span, 0), 1);
					stop = FLIGHT_STOPS.find((s) => p >= s.from && p <= s.to) || null;
				}
			}
			setActiveStop((prev) => {
				const next = stop ? stop.id : null;
				return prev === next ? prev : next;
			});
		};

		const schedule = () => {
			if (frameRef.current !== null) return;
			frameRef.current = window.requestAnimationFrame(place);
		};

		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });
		place();

		return () => {
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			if (frameRef.current !== null) {
				window.cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
		};
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

	const backdropClass = section > INTERLUDE_SECTION
		? 'globe-backdrop globe-backdrop--dimmed'
		: 'globe-backdrop';

	return (
		<div ref={wrapperRef} className={backdropClass} aria-hidden="true">
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

			{/* City cards — one per flight stop, shown while the camera holds.
			    Content mirrors the Experience section below, so the whole
			    backdrop stays aria-hidden rather than announcing it twice. */}
			{FLIGHT_STOPS.map((stop) => (
				<div
					key={stop.id}
					className={`globe-card${activeStop === stop.id ? ' globe-card--visible' : ''}`}
				>
					<p className="globe-card__place">{stop.place}</p>
					{stop.roles.map((role) => (
						<div key={role.org} className="globe-card__role">
							<h3 className="globe-card__title">{role.title}</h3>
							<p className="globe-card__org">
								{role.org}
								<span className="globe-card__when">{role.when}</span>
							</p>
							<p className="globe-card__detail">{role.detail}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default GlobeBackdrop;
