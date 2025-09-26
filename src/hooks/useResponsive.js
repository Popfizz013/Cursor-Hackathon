import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define breakpoints
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Additional responsive helpers
  const isLandscape = windowSize.width > windowSize.height;
  const isPortrait = windowSize.height > windowSize.width;

  // Device pixel ratio for high-DPI displays
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  const isHighDPI = pixelRatio > 1;

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    isPortrait,
    isHighDPI,
    pixelRatio,
  };
};

export default useResponsive;
