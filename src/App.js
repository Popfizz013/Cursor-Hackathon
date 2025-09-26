import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense, lazy } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ResponsiveLayout from './components/ResponsiveLayout';
import PortfolioContainer from './components/PortfolioContainer';
import useResponsive from './hooks/useResponsive';
import './styles/App.css';

const Globe3D = lazy(() => import('./components/Globe3D'));
const UI = lazy(() => import('./components/UI'));

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
  const [activeChapter, setActiveChapter] = useState(null);
  const [globeInfo, setGlobeInfo] = useState(null);
  const [isGlobeEnabled, setIsGlobeEnabled] = useState(false);
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

  useEffect(() => {
    // Automatically disable the 3D experience on mobile devices for stability
    if (deviceType === 'mobile') {
      setIsGlobeEnabled(false);
    } else {
      setIsGlobeEnabled(true);
    }
  }, [deviceType]);

  const handleSectionChange = useCallback(({ section, data, progress }) => {
    setActiveChapter(section);
    setGlobeInfo({ data, progress });
  }, []);

  const canvasProps = useMemo(() => ({
    camera: {
      position: [0, 0, 3],
      fov: deviceType === 'mobile' ? 70 : 55
    },
    dpr: [1, deviceType === 'desktop' ? 1.75 : 1.25],
    gl: {
      antialias: false,
      powerPreference: 'high-performance'
    }
  }), [deviceType]);

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
      <PortfolioContainer deviceType={deviceType} onScrollChange={handleSectionChange} />

      <section className={`globe-section ${isGlobeEnabled ? '' : 'globe-disabled'}`}>
        <ResponsiveLayout deviceType={deviceType} minHeight="100vh">
          {isGlobeEnabled ? (
            <>
              <Canvas
                {...canvasProps}
                style={{
                  background: 'linear-gradient(135deg, #050509 0%, #0f1b3d 50%, #020611 100%)'
                }}
              >
                <Suspense
                  fallback={(
                    <ambientLight intensity={0.4} /* eslint-disable-line react/no-unknown-property */ />
                  )}
                >
                  {/* eslint-disable react/no-unknown-property */}
                  <CameraLight />
                  <ambientLight intensity={0.45} />
                  <directionalLight
                    position={[4, 5, 3]}
                    intensity={1.1}
                    color="#9ecfff"
                  />
                  <pointLight position={[-4, 3, 5]} intensity={0.6} color="#6aa7ff" />
                  <Stars
                    radius={80}
                    depth={40}
                    count={deviceType === 'desktop' ? 1600 : 600}
                    factor={3}
                    saturation={0}
                    fade
                  />
                  <Globe3D deviceType={deviceType} activeChapter={activeChapter} info={globeInfo} />
                  {/* eslint-enable react/no-unknown-property */}
                </Suspense>
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  enableRotate={false}
                  enableDamping
                  dampingFactor={0.05}
                  autoRotate={deviceType === 'mobile'}
                  autoRotateSpeed={deviceType === 'mobile' ? 0.35 : 0.75}
                />
              </Canvas>
              <Suspense fallback={null}>
                <UI deviceType={deviceType} activeChapter={activeChapter} info={globeInfo} />
              </Suspense>
            </>
          ) : (
            <div className="globe-offline">
              <div className="placeholder-content">
                <h3>Lightweight Mode</h3>
                <p>The 3D globe is disabled to keep the site responsive on this device.</p>
                <button type="button" onClick={() => setIsGlobeEnabled(true)}>
                  Enable 3D Experience
                </button>
              </div>
            </div>
          )}
        </ResponsiveLayout>
      </section>
    </div>
  );
}

export default App;
