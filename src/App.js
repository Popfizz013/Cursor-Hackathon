import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import Globe3D from './components/Globe3D';
import UI from './components/UI';
import ResponsiveLayout from './components/ResponsiveLayout';
import useResponsive from './hooks/useResponsive';
import './styles/App.css';

function App({ onReady }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
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
      <ResponsiveLayout deviceType={deviceType}>
        <Canvas
          camera={{ 
            position: [0, 0, 5], 
            fov: deviceType === 'mobile' ? 75 : 60 
          }}
          style={{ 
            background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)' 
          }}
        >
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
            enablePan={deviceType !== 'mobile'}
            enableZoom={true}
            enableRotate={true}
            minDistance={deviceType === 'mobile' ? 3 : 2}
            maxDistance={deviceType === 'mobile' ? 8 : 10}
            autoRotate={deviceType === 'mobile'}
            autoRotateSpeed={deviceType === 'mobile' ? 0.5 : 1}
          />
        </Canvas>
        <UI deviceType={deviceType} />
      </ResponsiveLayout>
    </div>
  );
}

export default App;
