import React, { forwardRef } from 'react';
import './SectionStyles.css';

const SkillsSection = forwardRef(({ data, deviceType, isActive }, ref) => {
  if (!data) return null;

  return (
    <section 
      ref={ref}
      className={`skills-section section ${isActive ? 'active' : ''}`}
      data-section-index={1}
      style={{ opacity: isActive ? 1 : 0.95 }}
    >
      <div className="section-content">
        <div className="section-header">
          <div className="section-number">02</div>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-description">
            Technical skills and tools I use to build innovative solutions
          </p>
        </div>

        <div className="skills-grid">
          {data.categories.map((category) => (
            <div
              key={category.name}
              className="skill-category"
            >
              <h3 className="category-title">{category.name}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="skill-tag"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-summary">
          <h3>Key Strengths</h3>
          <div className="strengths-grid">
            <div className="strength-item">
              <h4>🚀 Full-Stack Development</h4>
              <p>Building end-to-end applications with modern web technologies</p>
            </div>
            <div className="strength-item">
              <h4>📊 Data Analysis</h4>
              <p>Extracting insights from complex datasets using Python and SQL</p>
            </div>
            <div className="strength-item">
              <h4>🔧 Problem Solving</h4>
              <p>Debugging, triaging, and implementing efficient solutions</p>
            </div>
            <div className="strength-item">
              <h4>👥 Team Leadership</h4>
              <p>Leading teams and mentoring others in collaborative environments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
