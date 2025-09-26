import React from 'react';
import styled from 'styled-components';

const SplashWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(3rem, 8vw, 6rem);
  color: #ffffff;
  overflow: hidden;
  background: radial-gradient(circle at 20% 20%, rgba(135, 206, 235, 0.15), transparent 55%),
              radial-gradient(circle at 80% 30%, rgba(173, 216, 230, 0.1), transparent 60%),
              linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 60%, #16213e 100%);
`;

const Glow = styled.div`
  position: absolute;
  top: -20%;
  right: -10%;
  width: 40vw;
  height: 40vw;
  min-width: 320px;
  min-height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(135, 206, 235, 0.35), transparent 65%);
  filter: blur(60px);
  opacity: 0.7;
  pointer-events: none;
`;

const Starfield = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px);
  background-size: 4px 4px;
  opacity: 0.2;
  animation: shimmer 12s linear infinite;

  @keyframes shimmer {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-50px, -50px, 0);
    }
  }
`;

const SplashContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 960px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2.5rem);
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
`;

const Highlight = styled.span`
  background: linear-gradient(120deg, rgba(135, 206, 235, 0.9), rgba(173, 216, 230, 0.65));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  max-width: 640px;
  opacity: 0.8;
  line-height: 1.6;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 2rem;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.75);
`;

const Accent = styled.span`
  color: rgba(135, 206, 235, 0.9);
`;

const CTAButton = styled.button`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(135, 206, 235, 0.4);
  border-radius: 999px;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.75rem, 4vw, 2.5rem);
  font-size: clamp(0.9rem, 2.1vw, 1.1rem);
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 20px 40px rgba(12, 12, 12, 0.4);

  &:hover {
    transform: translateY(-3px);
    background: rgba(135, 206, 235, 0.2);
    box-shadow: 0 25px 50px rgba(12, 12, 12, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SplashSection = ({ deviceType, onExplore }) => {
  return (
    <SplashWrapper>
      <Glow />
      <Starfield />
      <SplashContent>
        <Title>
          Elevate Your Journey<br />
          <Highlight>Beyond The Atmosphere</Highlight>
        </Title>
        <Subtitle>
          An immersive portfolio experience crafted with interactive 3D storytelling, responsive design, and a cosmic aesthetic that keeps you grounded while reaching for the stars.
        </Subtitle>
        <MetaRow>
          <span>Built for <Accent>Cursor Hackathon</Accent></span>
          <span>Optimized for <Accent>{deviceType}</Accent></span>
          <span>Powered by <Accent>React · Three.js</Accent></span>
        </MetaRow>
        <CTAButton type="button" onClick={onExplore}>
          Explore The Globe
        </CTAButton>
      </SplashContent>
    </SplashWrapper>
  );
};

export default SplashSection;

