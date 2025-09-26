import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './SectionStyles.css';

const ContactSection = ({ data, deviceType, isActive }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isActive && sectionRef.current) {
      sectionRef.current.classList.add('visible');
    }
  }, [isActive]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`contact-section section ${isActive ? 'active' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      <div className="section-content">
        {/* Section header */}
        <motion.div 
          className="section-header"
          variants={itemVariants}
        >
          <h2 className="section-title">{data.title}</h2>
          <h3 className="section-subtitle">{data.subtitle}</h3>
          <p className="section-description">{data.description}</p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact methods */}
          <motion.div 
            className="contact-methods"
            variants={itemVariants}
          >
            <motion.div 
              className="contact-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.div>

            <motion.div 
              className="contact-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.div>

            <motion.div 
              className="contact-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="contact-icon github-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h4>GitHub</h4>
              <p>Code Repository</p>
              <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="contact-link">
                View Profile
              </a>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div 
            className="contact-form-container"
            variants={itemVariants}
          >
            <motion.form 
              className="contact-form"
              variants={cardVariants}
            >
              <h4>Send a Message</h4>
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5"
                  placeholder="Tell me about your project or idea..."
                  required
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <span className="button-arrow">→</span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Additional Lorem ipsum content */}
        <motion.div 
          className="contact-lorem-content"
          variants={itemVariants}
        >
          <h3>Lorem Ipsum Dolor Sit Amet</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          
          <div className="lorem-contact-features">
            <div className="lorem-contact-feature">
              <h4>Consectetur Adipiscing</h4>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
            </div>
            <div className="lorem-contact-feature">
              <h4>Sed Do Eiusmod</h4>
              <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
            </div>
            <div className="lorem-contact-feature">
              <h4>Tempor Incididunt</h4>
              <p>Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.</p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="contact-footer"
          variants={itemVariants}
        >
          <p>&copy; 2024 Your Name. All rights reserved.</p>
          <p>Built with React, Three.js, and lots of ☕</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
