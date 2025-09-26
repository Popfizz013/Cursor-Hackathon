import React, { useState } from 'react';
import styled from 'styled-components';

const UIContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

const ControlPanel = styled.div`
  position: absolute;
  top: ${props => props.deviceType === 'mobile' ? '10px' : '20px'};
  right: ${props => props.deviceType === 'mobile' ? '10px' : '20px'};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.deviceType === 'mobile' ? '8px' : '12px'};
  padding: ${props => props.deviceType === 'mobile' ? '12px' : '16px'};
  pointer-events: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h1`
  color: white;
  font-size: ${props => props.deviceType === 'mobile' ? '18px' : '24px'};
  margin: 0 0 ${props => props.deviceType === 'mobile' ? '8px' : '12px'} 0;
  font-weight: 600;
  text-align: center;
`;

const InfoPanel = styled.div`
  position: absolute;
  bottom: ${props => props.deviceType === 'mobile' ? '10px' : '20px'};
  left: ${props => props.deviceType === 'mobile' ? '10px' : '20px'};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.deviceType === 'mobile' ? '8px' : '12px'};
  padding: ${props => props.deviceType === 'mobile' ? '12px' : '16px'};
  pointer-events: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: ${props => props.deviceType === 'mobile' ? 'calc(100% - 20px)' : '300px'};
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: ${props => props.deviceType === 'mobile' ? '8px 12px' : '10px 16px'};
  border-radius: ${props => props.deviceType === 'mobile' ? '6px' : '8px'};
  cursor: pointer;
  font-size: ${props => props.deviceType === 'mobile' ? '12px' : '14px'};
  margin: ${props => props.deviceType === 'mobile' ? '4px' : '6px'};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${props => props.deviceType === 'mobile' ? '12px' : '14px'};
  margin: 0 0 ${props => props.deviceType === 'mobile' ? '8px' : '12px'} 0;
  line-height: 1.4;
`;

const UI = ({ deviceType }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const handleToggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <UIContainer>
      <ControlPanel deviceType={deviceType}>
        <Title deviceType={deviceType}>3D Globe</Title>
        <div style={{ display: 'flex', flexDirection: deviceType === 'mobile' ? 'column' : 'row', gap: '8px' }}>
          <Button deviceType={deviceType} onClick={handleToggleInfo}>
            {isInfoVisible ? 'Hide Info' : 'Show Info'}
          </Button>
          <Button deviceType={deviceType}>
            {deviceType === 'mobile' ? 'Touch' : 'Mouse'} Controls
          </Button>
        </div>
      </ControlPanel>

      {isInfoVisible && (
        <InfoPanel deviceType={deviceType}>
          <InfoText deviceType={deviceType}>
            <strong>Interactive 3D Globe</strong>
          </InfoText>
          <InfoText deviceType={deviceType}>
            {deviceType === 'mobile' 
              ? 'Touch and drag to rotate • Pinch to zoom • Auto-rotates'
              : 'Click and drag to rotate • Scroll to zoom • Right-click to pan'
            }
          </InfoText>
          <InfoText deviceType={deviceType}>
            Built for Victoria's first Cursor Hackathon with responsive design for all devices.
          </InfoText>
          <InfoText deviceType={deviceType}>
            <strong>Device:</strong> {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
          </InfoText>
        </InfoPanel>
      )}
    </UIContainer>
  );
};

export default UI;
