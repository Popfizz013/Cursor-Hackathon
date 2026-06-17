/* eslint-disable react/no-unknown-property */
import React, { Suspense, useMemo, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe3D from '../../globe/Globe3D.jsx';

const ClearBackground = () => {
	const { gl, scene } = useThree();
	useEffect(() => {
		gl.setClearColor(0x000000, 0);
		scene.background = null;
	}, [gl, scene]);
	return null;
};

const GlobeInterlude = ({ deviceType }) => {
	const info = useMemo(() => ({
		data: { globeRotation: { x: 0.15, y: Math.PI / 5, z: 0 } },
		progress: 0,
		section: 0
	}), []);

	return (
		<div className="globe-interlude">
			<Suspense fallback={null}>
				<Canvas
					gl={{ alpha: true, antialias: true }}
					camera={{
						position: [0, 0, 3],
						fov: deviceType === 'mobile' ? 70 : 55,
					}}
					dpr={[1, deviceType === 'desktop' ? 1.5 : 1.1]}
				>
					<ClearBackground />
					<ambientLight intensity={0.5} />
					<directionalLight position={[4, 5, 3]} intensity={1} color="#9ecfff" />
					<pointLight position={[-4, 3, 5]} intensity={0.6} color="#6aa7ff" />
					<Globe3D deviceType={deviceType} activeChapter={0} info={info} />
					<OrbitControls
						enablePan={false}
						enableZoom={false}
						enableRotate
						enableDamping
						dampingFactor={0.08}
						autoRotate={deviceType === 'mobile'}
						autoRotateSpeed={0.4}
					/>
				</Canvas>
			</Suspense>
		</div>
	);
};

export default GlobeInterlude;
