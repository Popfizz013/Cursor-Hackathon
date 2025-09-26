import React, { forwardRef } from 'react';
import './SectionStyles.css';

const EducationSection = forwardRef(({ data, deviceType, isActive }, ref) => {
  if (!data) return null;

  return (
    <section 
      ref={ref}
      className={`education-section section ${isActive ? 'active' : ''}`}
      data-section-index={4}
      style={{ opacity: isActive ? 1 : 0.95 }}
    >
      <div className="section-content">
        <div className="section-header">
          <div className="section-number">05</div>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-description">
            My academic journey and continuous learning
          </p>
        </div>

        <div className="education-card">
          <div className="education-header">
            <h3 className="degree-title">{data.degree}</h3>
            <h4 className="institution-name">{data.institution}</h4>
            <div className="education-meta">
              <span className="education-duration">{data.duration}</span>
              <span className="education-location">{data.location}</span>
            </div>
          </div>
          
          <p className="education-description">{data.description}</p>
          
          {data.currentCourses && data.currentCourses.length > 0 && (
            <div className="current-courses">
              <h5>Current Courses:</h5>
              <div className="courses-grid">
                {data.currentCourses.map((course, index) => (
                  <span
                    key={index}
                    className="course-tag"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="certifications">
          <h3>Certifications & Security Clearance</h3>
          <div className="cert-grid">
            <div className="cert-item">
              <div className="cert-icon">🔒</div>
              <div className="cert-details">
                <h4>Reliability Status</h4>
                <p>Security screening completed for work with protected information (Apr 2025 – Apr 2035)</p>
                <span className="cert-status">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';

export default EducationSection;
