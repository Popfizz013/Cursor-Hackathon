import React, { useState, useEffect } from 'react';
import PortfolioContainer from './components/PortfolioContainer';
import useResponsive from './hooks/useResponsive';
import './styles/App.css';

function App() {
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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" role="status" aria-live="polite">
          <div className="spinner"></div>
          <p>Initializing 3D Globe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <PortfolioContainer deviceType={deviceType} />
    </div>
  );
}

export default App;
