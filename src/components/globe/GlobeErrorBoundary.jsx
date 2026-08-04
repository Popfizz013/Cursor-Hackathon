import React from 'react';

// The globe is decoration — if WebGL is unavailable or its chunk fails to
// load, the site should carry on without it rather than crash.
class GlobeErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error) {
		console.warn('Globe disabled:', error);
	}

	render() {
		if (this.state.hasError) {
			return null;
		}
		return this.props.children;
	}
}

export default GlobeErrorBoundary;
