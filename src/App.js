import React, { useState, useEffect, useCallback } from 'react';
import PortfolioContainer from './components/PortfolioContainer';
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

  const handleSectionChange = useCallback(({ section, data, progress }) => {
  }, []);

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
    </div>
  );
}

export default App;
