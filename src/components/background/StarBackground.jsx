import React, { useMemo } from 'react';
import './StarBackground.css';

function generateStarShadows(count, spread) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * spread);
    const y = Math.floor(Math.random() * spread);
    const opacity = (Math.random() * 0.6 + 0.3).toFixed(2);
    shadows.push(`${x}px ${y}px rgba(255, 255, 255, ${opacity})`);
  }
  return shadows.join(', ');
}

function generateGlowStarShadows(count, spread) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * spread);
    const y = Math.floor(Math.random() * spread);
    const hue = Math.random() < 0.3 ? `200, 220, 255` : `255, 255, 255`;
    shadows.push(`${x}px ${y}px 2px rgba(${hue}, 0.9)`);
  }
  return shadows.join(', ');
}

const StarBackground = () => {
  const spread = 2800;

  const smallStars = useMemo(() => generateStarShadows(700, spread), []);
  const mediumStars = useMemo(() => generateStarShadows(300, spread), []);
  const largeStars = useMemo(() => generateGlowStarShadows(120, spread), []);

  return (
    <div className="star-background" aria-hidden="true">
      <div className="star-background__nebula" />
      <div className="star-layer star-layer--small" style={{ boxShadow: smallStars }} />
      <div className="star-layer star-layer--medium" style={{ boxShadow: mediumStars }} />
      <div className="star-layer star-layer--large" style={{ boxShadow: largeStars }} />
    </div>
  );
};

export default StarBackground;
