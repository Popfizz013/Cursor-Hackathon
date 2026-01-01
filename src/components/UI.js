import React, { useState, useMemo } from 'react';
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
  max-width: ${props => props.deviceType === 'mobile' ? 'calc(100% - 20px)' : '320px'};
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

const ChapterBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(135, 206, 235, 0.12);
  border: 1px solid rgba(135, 206, 235, 0.35);
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 8px;
`;

const ProgressIndicator = styled.div`
  width: ${props => `${Math.max(6, props.value * 100)}%`};
  height: 100%;
  background: linear-gradient(90deg, rgba(135, 206, 235, 0.8), rgba(173, 216, 230, 0.6));
  transition: width 0.3s ease;
`;

const InfoCard = styled.div`
  position: absolute;
  top: ${props => props.deviceType === 'mobile' ? '70px' : '90px'};
  right: ${props => props.deviceType === 'mobile' ? '10px' : '20px'};
  width: min(320px, 80vw);
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px 18px;
  backdrop-filter: blur(12px);
  pointer-events: auto;
  color: rgba(255, 255, 255, 0.92);
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 18px 45px rgba(5, 12, 30, 0.45);
`;

const InfoHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const InfoTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
  background: linear-gradient(90deg, #ffffff, #8fd0f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const InfoSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(135, 206, 235, 0.18);
  color: rgba(255, 255, 255, 0.9);
  font-size: 11px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const InfoBody = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
`;

const UI = ({ deviceType, activeChapter, info }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isControlVisible, setIsControlVisible] = useState(deviceType !== 'mobile');

  const handleToggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const handleResetView = () => {
    if (!info) return;
    setIsInfoVisible(false);
  };

  const handleToggleControls = () => {
    setIsControlVisible(!isControlVisible);
  };

  const detail = useMemo(() => {
    const chapterIndex = activeChapter ?? 0;
    const data = info?.data || null;
    const progress = info?.progress ?? 0;

    if (!data) {
      return {
        title: 'Exploration Mode',
        subtitle: 'Scroll to begin your journey',
        description: 'Each chapter reveals a new perspective on the globe. Use the navigation or keep scrolling to progress through the story.',
        chapterIndex,
        progress
      };
    }

    if (data.type === 'work-experience') {
      return {
        title: 'Work Experience Gateway',
        subtitle: 'Chapter 02',
        description: 'An overview of professional milestones. The globe aligns to highlight the journey that follows in upcoming sections.',
        accent: 'Experience Hub',
        chapterIndex,
        progress
      };
    }

    if (data.achievements) {
      return {
        title: data.company,
        subtitle: data.position,
        description: data.description,
        accent: data.duration,
        chapterIndex,
        progress,
        tags: data.technologies?.slice(0, 3) || []
      };
    }

    if (data.title) {
      return {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        chapterIndex,
        progress
      };
    }

    return {
      title: 'Exploration Mode',
      subtitle: 'Chapter 00',
      description: 'Navigate through the chapters to uncover more details about the journey.',
      chapterIndex,
      progress
    };
  }, [activeChapter, info]);

  return (
    <UIContainer>
      <ControlPanel deviceType={deviceType}>
        <Title deviceType={deviceType}>3D Globe</Title>
        <div style={{ display: 'flex', flexDirection: deviceType === 'mobile' ? 'column' : 'row', gap: '8px' }}>
          <Button deviceType={deviceType} onClick={handleToggleInfo}>
            {isInfoVisible ? 'Hide Info' : 'Show Info'}
          </Button>
          <Button deviceType={deviceType} onClick={handleResetView}>
            Reset View
          </Button>
          {deviceType !== 'desktop' && (
            <Button deviceType={deviceType} onClick={handleToggleControls}>
              {isControlVisible ? 'Hide Controls' : 'Show Controls'}
            </Button>
          )}
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
            <strong>Active Chapter:</strong> {String((detail.chapterIndex ?? 0) + 1).padStart(2, '0')}
          </InfoText>
          <InfoText deviceType={deviceType}>
            <strong>Progress:</strong> {Math.round((detail.progress || 0) * 100)}%
          </InfoText>
        </InfoPanel>
      )}

      {detail && isControlVisible && (
        <InfoCard deviceType={deviceType}>
          <InfoHeading>
            <InfoTitle>{detail.title}</InfoTitle>
            <ChapterBadge>
              <span>Chapter {String((detail.chapterIndex ?? 0) + 1).padStart(2, '0')}</span>
            </ChapterBadge>
          </InfoHeading>
          {detail.subtitle && <InfoSubtitle>{detail.subtitle}</InfoSubtitle>}
          {detail.accent && <Tag>{detail.accent}</Tag>}
          {detail.description && <InfoBody>{detail.description}</InfoBody>}
          {detail.tags && detail.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {detail.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <ProgressBar>
            <ProgressIndicator value={detail.progress || 0} />
          </ProgressBar>
        </InfoCard>
      )}
    </UIContainer>
  );
};

export default UI;
