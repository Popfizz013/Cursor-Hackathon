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
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
