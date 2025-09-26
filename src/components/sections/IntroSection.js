import React, { forwardRef } from 'react';
import './SectionStyles.css';

const IntroSection = forwardRef(({ data }, ref) => {
  return (
    <section ref={ref} className="intro-section section" data-section-index={0}>
      <div className="section-content">
        <div className="intro-text">
          <h1 className="section-title">{data.title}</h1>
          <h2 className="section-subtitle">{data.subtitle}</h2>
          <p className="section-description">{data.description}</p>

          <div className="intro-features">
            <div className="feature-item">
              <h4>🎓 Computer Science Student</h4>
              <p>Pursuing BSc at University of Victoria</p>
            </div>
            <div className="feature-item">
              <h4>💻 Full-Stack Developer</h4>
              <p>React, Node.js, Python, and modern technologies</p>
            </div>
            <div className="feature-item">
              <h4>🔬 Research & Innovation</h4>
              <p>Working on satellite communication protocols</p>
            </div>
          </div>

          <div className="intro-contact">
            <div className="contact-info">
              <p><strong>📍 {data.location}</strong></p>
              <p><strong>📧 {data.email}</strong></p>
              <p><strong>📞 {data.phone}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

export default IntroSection;