import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './SectionStyles.css';

const IntroSection = ({ data, deviceType, isActive }) => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`intro-section section ${isActive ? 'active' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      <div className="section-content">
        <div className="intro-grid">
          {/* Left side - Text content */}
          <motion.div 
            className="intro-text"
            variants={itemVariants}
          >
            <motion.h1 
              className="section-title"
              variants={itemVariants}
            >
              {data.title}
            </motion.h1>
            
            <motion.h2 
              className="section-subtitle"
              variants={itemVariants}
            >
              {data.subtitle}
            </motion.h2>
            
            <motion.p 
              className="section-description"
              variants={itemVariants}
            >
              {data.description}
            </motion.p>
            
            <motion.div 
              className="intro-features"
              variants={itemVariants}
            >
              <div className="feature-item">
                <h4>🚀 Full-Stack Development</h4>
                <p>React, Node.js, and modern web technologies</p>
              </div>
              <div className="feature-item">
                <h4>🎨 3D Visualization</h4>
                <p>Interactive Three.js experiences and animations</p>
              </div>
              <div className="feature-item">
                <h4>📱 Responsive Design</h4>
                <p>Mobile-first approach for all devices</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="intro-cta"
              variants={itemVariants}
            >
              <button className="cta-button primary">
                {data.cta}
                <span className="button-arrow">→</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right side - Visual content */}
          <motion.div 
            className="intro-visual"
            variants={itemVariants}
          >
            <div className="visual-container">
              <div className="globe-preview">
                <div className="globe-placeholder">
                  <div className="globe-sphere"></div>
                  <div className="globe-atmosphere"></div>
                </div>
              </div>
              
              <div className="floating-elements">
                <div className="floating-element element-1"></div>
                <div className="floating-element element-2"></div>
                <div className="floating-element element-3"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          variants={itemVariants}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          <div className="scroll-text">Scroll down to explore my work experience</div>
          <div className="scroll-arrow">
            <div className="arrow-line"></div>
            <div className="arrow-head"></div>
          </div>
        </motion.div>

        {/* Additional content to ensure scrolling */}
        <motion.div 
          className="intro-additional"
          variants={itemVariants}
        >
          <h3>Why Choose Me?</h3>
          <div className="additional-grid">
            <div className="additional-item">
              <h4>🎯 Problem Solver</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
            <div className="additional-item">
              <h4>🚀 Innovation Focused</h4>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
            <div className="additional-item">
              <h4>👥 Team Player</h4>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            </div>
            <div className="additional-item">
              <h4>📈 Results Driven</h4>
              <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
            </div>
          </div>
        </motion.div>

        {/* More content sections */}
        <motion.div 
          className="intro-stats"
          variants={itemVariants}
        >
          <h3>By the Numbers</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available Support</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="intro-process"
          variants={itemVariants}
        >
          <h3>My Development Process</h3>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Discovery & Planning</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Design & Prototyping</h4>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Development & Testing</h4>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Deployment & Support</h4>
                <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Lorem ipsum content sections */}
        <motion.div 
          className="intro-lorem-section"
          variants={itemVariants}
        >
          <h3>Lorem Ipsum Dolor Sit Amet</h3>
          <div className="lorem-grid">
            <div className="lorem-item">
              <h4>Consectetur Adipiscing</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
            <div className="lorem-item">
              <h4>Sed Do Eiusmod</h4>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
            <div className="lorem-item">
              <h4>Tempor Incididunt</h4>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            </div>
            <div className="lorem-item">
              <h4>Ut Labore Et Dolore</h4>
              <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="intro-more-content"
          variants={itemVariants}
        >
          <h3>Magna Aliqua Ut Enim</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          
          <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
        </motion.div>

        {/* Additional content to ensure scrolling */}
        <motion.div 
          className="intro-final-content"
          variants={itemVariants}
        >
          <h3>Final Lorem Ipsum Section</h3>
          <div className="final-content-grid">
            <div className="final-content-item">
              <h4>Consectetur Adipiscing Elit</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="final-content-item">
              <h4>Sed Do Eiusmod Tempor</h4>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="final-content-item">
              <h4>Incididunt Ut Labore</h4>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default IntroSection;
