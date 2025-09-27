import React, { forwardRef, useMemo, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Globe3D from '../Globe3D';
import './SectionStyles.css';

const ExperienceSection = forwardRef(({ data, deviceType, isActive }, ref) => {
  const experiences = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const hasExperiences = experiences.length > 0;

  const [showGlobe, setShowGlobe] = useState(false);

  const globeInfo = useMemo(() => {
    if (!hasExperiences) {
      return { data: {}, progress: 0 };
    }

    const fallbackRotation = experiences[0]?.globeRotation || { x: 0, y: 0, z: 0 };
    return {
      data: { globeRotation: fallbackRotation },
      progress: 0
    };
  }, [experiences, hasExperiences]);

  if (!hasExperiences) {
    return null;
  }

  const sectionClassNames = [
    'experience-section',
    'section',
    isActive ? 'active' : '',
    showGlobe ? 'globe-active' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      ref={ref}
      className={sectionClassNames}
      data-section-index={2}
      style={{ opacity: isActive ? 1 : 0.95 }}
    >
      <div className="section-content">
        {!showGlobe && (
          <div className="section-header">
            <div className="section-number">03</div>
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-description">
              My journey in software development and technology
            </p>
          </div>
        )}

        <div className="globe-toggle-row">
          <span className="globe-toggle-label">Interactive 3D Globe</span>
          <button
            type="button"
            className={`globe-toggle-button ${showGlobe ? 'active' : ''}`}
            onClick={() => setShowGlobe((prev) => !prev)}
          >
            {showGlobe ? 'Disable' : 'Enable'}
          </button>
        </div>

        {showGlobe ? (
          <div className="experience-globe experience-globe--expanded">
            <Suspense fallback={<div className="globe-loading">Loading globe…</div>}>
              {/* eslint-disable react/no-unknown-property */}
              <Canvas
                camera={{
                  position: [0, 0, 3],
                  fov: deviceType === 'mobile' ? 70 : 55
                }}
                dpr={[1, deviceType === 'desktop' ? 1.5 : 1.1]}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 5, 3]} intensity={1} color="#9ecfff" />
                <pointLight position={[-4, 3, 5]} intensity={0.6} color="#6aa7ff" />
                <Stars
                  radius={70}
                  depth={35}
                  count={deviceType === 'desktop' ? 1200 : 400}
                  factor={2.5}
                  saturation={0}
                  fade
                />
                <Globe3D deviceType={deviceType} activeChapter={0} info={globeInfo} />
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  enableRotate
                  enableDamping
                  dampingFactor={0.08}
                  autoRotate={deviceType === 'mobile'}
                  autoRotateSpeed={0.4}
                />
              </Canvas>
              {/* eslint-enable react/no-unknown-property */}
            </Suspense>
          </div>
        ) : (
          <>
            <div className="experience-timeline" aria-hidden={showGlobe}>
              {experiences.map((job) => (
                <div
                  key={job.id}
                  className="timeline-item"
                >
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  
                  <div className="timeline-content">
                    <div className="job-header">
                      <h3 className="job-position">{job.position}</h3>
                      <h4 className="job-company">{job.company}</h4>
                      <div className="job-meta">
                        <span className="job-duration">{job.duration}</span>
                        <span className="job-location">{job.location}</span>
                      </div>
                    </div>
                    
                    <p className="job-description">{job.description}</p>
                    
                    {job.details && job.details.length > 0 && (
                      <div className="job-details">
                        <h5>Key Responsibilities:</h5>
                        <ul>
                          {job.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {job.technologies && job.technologies.length > 0 && (
                      <div className="job-technologies">
                        <h5>Technologies Used:</h5>
                        <div className="tech-tags">
                          {job.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="experience-summary" aria-hidden={showGlobe}>
              <h3>Career Highlights</h3>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <div className="highlight-number">3+</div>
                  <div className="highlight-label">Years Experience</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-number">2</div>
                  <div className="highlight-label">Co-op Positions</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-number">8+</div>
                  <div className="highlight-label">Technologies Mastered</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-number">1</div>
                  <div className="highlight-label">Teaching Role</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;
