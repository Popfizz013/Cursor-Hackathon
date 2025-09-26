import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './SectionStyles.css';

const JobSection = ({ data, deviceType, isActive, sectionIndex }) => {
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
        staggerChildren: 0.15
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

  const slideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`job-section section ${isActive ? 'active' : ''}`}
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
          <div className="section-number">0{sectionIndex}</div>
          <h2 className="section-title">{data.company}</h2>
        </motion.div>

        <div className="job-grid">
          {/* Left side - Job details */}
          <motion.div 
            className="job-details"
            variants={slideVariants}
          >
            <div className="job-header">
              <h3 className="job-position">{data.position}</h3>
              <div className="job-duration">{data.duration}</div>
            </div>
            
            <p className="job-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <div className="job-achievements">
              <h4>Key Achievements</h4>
              <ul>
                {data.achievements.map((achievement, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="achievement-item"
                  >
                    <span className="achievement-bullet">•</span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="job-technologies">
              <h4>Technologies Used</h4>
              <div className="tech-tags">
                {data.technologies.map((tech, index) => (
                  <motion.span 
                    key={index}
                    className="tech-tag"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Visual content */}
          <motion.div 
            className="job-visual"
            variants={itemVariants}
          >
            <div className="visual-container">
              <div className="job-image-container">
                <div className="job-image-placeholder">
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h4>{data.company}</h4>
                      <p>{data.position}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating tech icons */}
              <div className="floating-tech">
                {data.technologies.slice(0, 4).map((tech, index) => (
                  <motion.div
                    key={index}
                    className="floating-tech-item"
                    style={{
                      '--delay': `${index * 0.2}s`,
                      '--x': `${(index % 2) * 100 - 50}px`,
                      '--y': `${Math.floor(index / 2) * 80 - 40}px`
                    }}
                    animate={isActive ? {
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6]
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Lorem ipsum content */}
        <motion.div 
          className="job-lorem-content"
          variants={itemVariants}
        >
          <h3>Lorem Ipsum Dolor Sit Amet</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          
          <div className="lorem-highlights">
            <div className="lorem-highlight">
              <h4>Consectetur Adipiscing</h4>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
            </div>
            <div className="lorem-highlight">
              <h4>Sed Do Eiusmod</h4>
              <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
            </div>
          </div>
        </motion.div>

        {/* Section divider */}
        <motion.div 
          className="section-divider"
          variants={itemVariants}
        >
          <div className="divider-line"></div>
          <div className="divider-dot"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JobSection;
