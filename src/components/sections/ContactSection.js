import React, { forwardRef } from 'react';
import './SectionStyles.css';

const ContactSection = forwardRef(({ data, deviceType, isActive }, ref) => {
  return (
    <section
      ref={ref}
      className={`contact-section section ${isActive ? 'active' : ''}`}
      data-section-index={5}
      style={{ opacity: isActive ? 1 : 0.95 }}
    >
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          <h3 className="section-subtitle">{data.subtitle}</h3>
          <p className="section-description">{data.description}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-methods">
            <div 
              className="contact-card"
            >
              <div className="contact-icon email-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h4>Email</h4>
              <p>{data.email}</p>
              <a href={`mailto:${data.email}`} className="contact-link">
                Send Message
              </a>
            </div>

            <div 
              className="contact-card"
            >
              <div className="contact-icon linkedin-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h4>LinkedIn</h4>
              <p>Professional Network</p>
              <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-link">
                Connect
              </a>
            </div>

            <div 
              className="contact-card"
            >
              <div className="contact-icon phone-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h4>Phone</h4>
              <p>{data.phone}</p>
              <a href={`tel:${data.phone}`} className="contact-link">
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footer">
          <p>&copy; 2024 Liam Degand. All rights reserved.</p>
          <p>Built with React, Three.js, and lots of ☕</p>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
