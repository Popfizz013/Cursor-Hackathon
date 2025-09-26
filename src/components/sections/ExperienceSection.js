import React, { forwardRef } from 'react';
import './SectionStyles.css';

const ExperienceSection = forwardRef(({ data, deviceType, isActive }, ref) => {
  if (!data || !Array.isArray(data)) return null;

  return (
    <section 
      ref={ref}
      className={`experience-section section ${isActive ? 'active' : ''}`}
      data-section-index={2}
      style={{ opacity: isActive ? 1 : 0.95 }}
    >
      <div className="section-content">
        <div className="section-header">
          <div className="section-number">03</div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-description">
            My journey in software development and technology
          </p>
        </div>

        <div className="experience-timeline">
          {data.map((job, index) => (
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

        <div className="experience-summary">
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
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;
