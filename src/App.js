import React, { useState, useEffect, useCallback } from 'react';
import PortfolioContainer from './components/PortfolioContainer';
import useResponsive from './hooks/useResponsive';
import './styles/App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    document.body.classList.add('app-mounted');
    const loader = document.getElementById('loading');
    if (loader) {
      loader.setAttribute('aria-hidden', 'true');
    }
  }, []);

  const handleSectionChange = useCallback(({ section, data, progress } = {}) => {
    if (typeof section === 'undefined') return;
    document.body.setAttribute('data-active-section', String(section));
    if (data && data.type) {
      document.body.setAttribute('data-active-section-type', data.type);
    } else {
      document.body.removeAttribute('data-active-section-type');
    }
    if (typeof progress === 'number') {
      document.body.style.setProperty('--active-section-progress', String(progress));
    } else {
      document.body.style.removeProperty('--active-section-progress');
    }
  }, []);

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
      <PortfolioContainer deviceType={deviceType} onScrollChange={handleSectionChange} />
    </div>
  );
}

export default App;
