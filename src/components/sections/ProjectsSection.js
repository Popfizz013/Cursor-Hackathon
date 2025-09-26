import React, { forwardRef } from 'react';
import './SectionStyles.css';

const ProjectsSection = forwardRef(({ data, deviceType, isActive }, ref) => {
  if (!data || !Array.isArray(data)) return null;

  return (
    <section 
      ref={ref}
      className={`projects-section section ${isActive ? 'active' : ''}`}
      data-section-index={3}
      style={{ opacity: isActive ? 1 : 0.95 }}
    >
      <div className="section-content">
        <div className="section-header">
          <div className="section-number">04</div>
          <h2 className="section-title">Personal Projects</h2>
          <p className="section-description">
            Innovative projects that showcase my technical skills and passion for learning
          </p>
        </div>

        <div className="projects-grid">
          {data.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
            >
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-meta">
                  <span className="project-organization">{project.organization}</span>
                  <span className="project-duration">{project.duration}</span>
                </div>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              {project.details && project.details.length > 0 && (
                <div className="project-details">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {project.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="project-technologies">
                  <h5>Technologies:</h5>
                  <div className="tech-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="projects-summary">
          <h3>Impact At a Glance</h3>
          <div className="impact-grid">
            <div className="impact-item">
              <div className="impact-icon">🛰️</div>
              <div className="impact-text">
                <h4>MARMOTSAT</h4>
                <p>Designed communication protocol for UVic&apos;s satellite project.</p>
              </div>
            </div>
            <div className="impact-item">
              <div className="impact-icon">🏁</div>
              <div className="impact-text">
                <h4>AWS DeepRacer</h4>
                <p>Optimized reinforcement learning reward functions for racing AI.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
