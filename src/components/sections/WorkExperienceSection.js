import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
// import { Canvas, useThree, useFrame } from '@react-three/fiber';
// import { OrbitControls, Environment, Stars } from '@react-three/drei';
// import Globe3D from '../Globe3D';
import './SectionStyles.css';

// function CameraLight() {
//   const { camera } = useThree();
//   const lightRef = useRef();

//   useFrame(() => {
//     if (lightRef.current && camera) {
//       lightRef.current.position.copy(camera.position);
//     }
//   });

//   return (
//     <pointLight ref={lightRef} args={[0xffffff, 3, 0]} /> // eslint-disable-line react/no-unknown-property
//   );
// }

const WorkExperienceSection = ({ deviceType, isActive, onGlobeScroll }) => {
  const sectionRef = useRef(null);
  const [globeRotation, setGlobeRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isActive && sectionRef.current) {
      sectionRef.current.classList.add('visible');
    }
  }, [isActive]);

  // Handle scroll within this section - DISABLED
  // useEffect(() => {
  //   if (!isActive) return;

  //   const handleScroll = () => {
  //     const section = sectionRef.current;
  //     if (!section) return;

  //     const rect = section.getBoundingClientRect();
  //     const scrollTop = window.pageYOffset;
  //     const sectionTop = section.offsetTop;
  //     const sectionHeight = section.offsetHeight;
  //     const windowHeight = window.innerHeight;

  //     // Calculate scroll progress within this section (0 to 1)
  //     const progress = Math.max(0, Math.min(1, 
  //       (scrollTop - sectionTop + windowHeight) / sectionHeight
  //     ));

  //     setScrollProgress(progress);

  //     // Update globe rotation based on scroll progress within this section
  //     const rotation = {
  //       x: Math.sin(progress * Math.PI * 2) * 0.3,
  //       y: progress * Math.PI * 2,
  //       z: Math.cos(progress * Math.PI * 1.5) * 0.2
  //     };

  //     setGlobeRotation(rotation);

  //     // Notify parent component about scroll progress
  //     if (onGlobeScroll) {
  //       onGlobeScroll({
  //         progress,
  //         rotation,
  //         section: 'work-experience'
  //       });
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isActive, onGlobeScroll]);

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

  return (
    <motion.section
      ref={sectionRef}
      className={`work-experience-section section ${isActive ? 'active' : ''}`}
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
          <div className="section-number">02</div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-description">
            Scroll to explore my professional journey through interactive 3D visualization
          </p>
        </motion.div>

        {/* 3D Globe Container - TEMPORARILY DISABLED */}
        {/* <motion.div 
          className="globe-container"
          variants={itemVariants}
        >
          <div className="globe-wrapper">
            <Canvas
              camera={{ 
                position: [0, 0, 3], 
                fov: deviceType === 'mobile' ? 75 : 60 
              }}
              style={{ 
                background: 'transparent',
                width: '100%',
                height: '100%'
              }}
            >
              <CameraLight />
              <ambientLight intensity={0.4} />
              <directionalLight 
                position={[5, 5, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-5, 5, 5]} intensity={0.8} color="#87ceeb" />
              <Environment preset="night" />
              <Stars 
                radius={100} 
                depth={50} 
                count={deviceType === 'mobile' ? 1000 : 5000} 
                factor={4} 
                saturation={0} 
                fade 
              />
              <Globe3D 
                deviceType={deviceType} 
                rotation={globeRotation}
                showInfoCard={isActive}
                currentSection="work-experience"
                enableScroll={isActive}
              />
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={isActive}
                minDistance={deviceType === 'mobile' ? 3 : 2}
                maxDistance={deviceType === 'mobile' ? 8 : 10}
                autoRotate={!isActive}
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>

          <motion.div 
            className="scroll-indicator"
            variants={itemVariants}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <div className="scroll-text">Scroll to rotate globe</div>
            <div className="scroll-arrow">
              <div className="arrow-line"></div>
              <div className="arrow-head"></div>
            </div>
          </motion.div>
        </motion.div> */}

        {/* 3D Globe Trigger */}
        <motion.div 
          className="globe-trigger"
          variants={itemVariants}
        >
          <div className="globe-trigger-content">
            <h3>Interactive 3D Globe</h3>
            <p>Explore my work experience through an interactive 3D visualization. Click the button below to launch the immersive globe experience.</p>
            <div className="globe-trigger-visual">
              <div className="trigger-sphere">
                <div className="sphere-inner"></div>
                <div className="sphere-glow"></div>
              </div>
            </div>
            <button 
              className="globe-launch-btn"
              onClick={() => {
                // This will be handled by the parent component
                if (onGlobeScroll) {
                  onGlobeScroll({
                    progress: 1,
                    rotation: { x: 0, y: 0, z: 0 },
                    section: 'work-experience',
                    launchGlobe: true
                  });
                }
              }}
            >
              Launch 3D Globe
            </button>
          </div>
        </motion.div>

        {/* Experience timeline */}
        <motion.div 
          className="experience-timeline"
          variants={itemVariants}
        >
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Senior Full-Stack Developer</h4>
              <p>Tech Startup Inc. • 2022 - Present</p>
              <span className="timeline-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </span>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Frontend Developer</h4>
              <p>Digital Agency Co. • 2020 - 2022</p>
              <span className="timeline-description">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </span>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Web Developer</h4>
              <p>Freelance • 2018 - 2020</p>
              <span className="timeline-description">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Skills and Technologies */}
        <motion.div 
          className="skills-section"
          variants={itemVariants}
        >
          <h3>Technical Skills</h3>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Frontend</h4>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Vue.js</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">HTML5</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Backend</h4>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">PHP</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">AWS</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>3D & Graphics</h4>
              <div className="skill-tags">
                <span className="skill-tag">Three.js</span>
                <span className="skill-tag">WebGL</span>
                <span className="skill-tag">Blender</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Adobe Creative Suite</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Lorem ipsum content */}
        <motion.div 
          className="work-lorem-content"
          variants={itemVariants}
        >
          <h3>Lorem Ipsum Dolor Sit Amet</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          
          <div className="lorem-features">
            <div className="lorem-feature">
              <h4>Consectetur Adipiscing</h4>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            <div className="lorem-feature">
              <h4>Sed Do Eiusmod</h4>
              <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            </div>
            <div className="lorem-feature">
              <h4>Tempor Incididunt</h4>
              <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WorkExperienceSection;
