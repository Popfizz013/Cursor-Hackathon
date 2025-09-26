import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import Globe3D from './components/Globe3D';
import UI from './components/UI';
import ResponsiveLayout from './components/ResponsiveLayout';
import SplashSection from './components/SplashSection';
import useResponsive from './hooks/useResponsive';
import './styles/App.css';

function CameraLight() {
  const { camera } = useThree();
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current && camera) {
      // Update light position to match camera position
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    // Point light that follows the camera position
    // args: [color, intensity, distance, decay]
    <pointLight ref={lightRef} args={[0xffffff, 3, 0]} /> // eslint-disable-line react/no-unknown-property
  );
}

function App({ onReady }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const globeSectionRef = useRef(null);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    // Determine device type based on screen size
    if (isMobile) setDeviceType('mobile');
    else if (isTablet) setDeviceType('tablet');
    else setDeviceType('desktop');
  }, [isMobile, isTablet, isDesktop]);

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
      if (onReady) onReady();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onReady]);

  const handleExplore = () => {
    if (globeSectionRef.current) {
      globeSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isLoaded) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Initializing 3D Globe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <SplashSection deviceType={deviceType} onExplore={handleExplore} />

      <section className="globe-section" ref={globeSectionRef}>
        <ResponsiveLayout deviceType={deviceType} minHeight="100vh">
          <Canvas
            camera={{
              position: [0, 0, 3],
              fov: deviceType === 'mobile' ? 75 : 60
            }}
            style={{
              background: 'linear-gradient(135deg, #050509 0%, #0f1b3d 50%, #020611 100%)'
            }}
          >
            <CameraLight />
            {/* Additional lighting setup */}
            {/* eslint-disable react/no-unknown-property */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, 5, 5]} intensity={0.8} color="#87ceeb" />
            {/* eslint-enable react/no-unknown-property */}
            <Environment preset="night" />
            <Stars
              radius={100}
              depth={50}
              count={deviceType === 'mobile' ? 1000 : 5000}
              factor={4}
              saturation={0}
              fade
            />
            <Globe3D deviceType={deviceType} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={false}
              minDistance={deviceType === 'mobile' ? 3 : 2}
              maxDistance={deviceType === 'mobile' ? 8 : 10}
              autoRotate={deviceType === 'mobile'}
              autoRotateSpeed={deviceType === 'mobile' ? 0.5 : 1}
            />
          </Canvas>
          <UI deviceType={deviceType} />
        </ResponsiveLayout>
      </section>
    </div>
  );
}

export default App;
