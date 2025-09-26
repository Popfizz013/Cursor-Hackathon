import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  
  /* Ensure proper touch handling on mobile */
  touch-action: ${props => props.deviceType === 'mobile' ? 'pan-x pan-y' : 'auto'};
  
  /* Prevent text selection on touch devices */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  /* Optimize for mobile performance */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  /* Performance optimizations */
  will-change: transform;
  
  /* Ensure canvas fills container properly */
  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
`;

const ResponsiveLayout = ({ children, deviceType }) => {
  return (
    <LayoutContainer deviceType={deviceType}>
      <CanvasContainer>
        {children}
      </CanvasContainer>
    </LayoutContainer>
  );
};

export default ResponsiveLayout;
