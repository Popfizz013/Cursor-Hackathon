import React, { useState, useEffect, useCallback } from 'react';
import PortfolioContainer from './components/portfolio/PortfolioContainer.jsx';
import StarBackground from './components/background/StarBackground.jsx';
import useResponsive from './hooks/useResponsive.jsx';
import './styles/App.css';

function App({ onReady }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [deviceType, setDeviceType] = useState('desktop');
	const { isMobile, isTablet, isDesktop } = useResponsive();

	useEffect(() => {
		if (isMobile) setDeviceType('mobile');
		else if (isTablet) setDeviceType('tablet');
		else setDeviceType('desktop');
	}, [isMobile, isTablet, isDesktop]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoaded(true);
			if (onReady) onReady();
		}, 2000);

		return () => clearTimeout(timer);
	}, [onReady]);

	const handleSectionChange = useCallback(() => {
		return undefined;
	}, []);

	if (!isLoaded) {
		return (
			<div className="app-loading">
				<div className="loading-spinner">
					<div className="spinner"></div>
					<p>Loading portfolio...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="app">
			<StarBackground />
			<PortfolioContainer deviceType={deviceType} onScrollChange={handleSectionChange} />
		</div>
	);
}

export default App;
