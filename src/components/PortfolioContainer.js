import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import IntroSection from './sections/IntroSection';
import WorkExperienceSection from './sections/WorkExperienceSection';
import JobSection from './sections/JobSection';
import ContactSection from './sections/ContactSection';
import './PortfolioContainer.css';

const PortfolioContainer = ({ onScrollChange, deviceType }) => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Portfolio data - replace with your actual information
  const portfolioData = {
    intro: {
      title: "Welcome to My Journey",
      subtitle: "Full-Stack Developer & 3D Enthusiast",
      description: "I'm a passionate developer who loves creating immersive digital experiences. This portfolio takes you through my professional journey, with each section representing a chapter of my career.",
      image: "/api/placeholder/400/300",
      cta: "Explore My Story"
    },
    jobs: [
      {
        id: 1,
        company: "Tech Startup Inc.",
        position: "Senior Full-Stack Developer",
        duration: "2022 - Present",
        description: "Led development of scalable web applications using React, Node.js, and cloud technologies. Implemented 3D visualization features that increased user engagement by 40%.",
        achievements: [
          "Built responsive web applications serving 100k+ users",
          "Implemented real-time 3D data visualization",
          "Led a team of 5 developers",
          "Reduced application load time by 60%"
        ],
        technologies: ["React", "Node.js", "Three.js", "AWS", "MongoDB"],
        image: "/api/placeholder/500/300",
        globeRotation: { x: 0, y: Math.PI / 4, z: 0 }
      },
      {
        id: 2,
        company: "Digital Agency Co.",
        position: "Frontend Developer",
        duration: "2020 - 2022",
        description: "Specialized in creating interactive user interfaces and implementing complex animations. Worked on high-profile client projects including e-commerce platforms and corporate websites.",
        achievements: [
          "Developed 20+ client websites",
          "Created custom animation libraries",
          "Improved site performance by 50%",
          "Mentored junior developers"
        ],
        technologies: ["Vue.js", "JavaScript", "CSS3", "WebGL", "Figma"],
        image: "/api/placeholder/500/300",
        globeRotation: { x: Math.PI / 6, y: Math.PI / 2, z: 0 }
      },
      {
        id: 3,
        company: "Freelance",
        position: "Web Developer",
        duration: "2018 - 2020",
        description: "Started my journey as a freelance developer, working with small businesses to create their online presence. This period taught me the importance of client communication and project management.",
        achievements: [
          "Completed 50+ projects",
          "Built custom WordPress themes",
          "Established client relationships",
          "Learned project management skills"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "WordPress"],
        image: "/api/placeholder/500/300",
        globeRotation: { x: -Math.PI / 4, y: Math.PI, z: 0 }
      }
    ],
    contact: {
      title: "Let's Connect",
      subtitle: "Ready to work together?",
      description: "I'm always interested in new opportunities and exciting projects. Whether you have a question about my work or want to discuss a potential collaboration, I'd love to hear from you.",
      email: "your.email@example.com",
      linkedin: "linkedin.com/in/yourprofile",
      github: "github.com/yourusername"
    }
  };

  // Handle scroll progress and section changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      console.log('Scroll Debug:', {
        scrollTop,
        windowHeight,
        documentHeight,
        scrollPercentage: (scrollTop / (documentHeight - windowHeight)) * 100
      });
      
      // Calculate current section based on scroll position
      const totalSections = portfolioData.jobs.length + 3; // intro + work experience + jobs + contact
      const sectionHeight = documentHeight / totalSections;
      const sectionIndex = Math.floor(scrollTop / sectionHeight);
      const clampedIndex = Math.min(Math.max(sectionIndex, 0), totalSections - 1);
      
      // Calculate scroll progress (0 to 1)
      const progress = (scrollTop % sectionHeight) / sectionHeight;
      setScrollProgress(progress);
      
      if (clampedIndex !== currentSection) {
        setCurrentSection(clampedIndex);
        console.log('Section changed to:', clampedIndex);
        
        // Only trigger 3D scene animation for work experience section
        if (onScrollChange) {
          const sectionData = getSectionData(clampedIndex);
          onScrollChange({
            section: clampedIndex,
            data: sectionData,
            progress: progress,
            isWorkExperience: clampedIndex === 1 // Work experience is section 1
          });
        }
      }
    };

    // Initial call to set up the first section
    setTimeout(handleScroll, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentSection, onScrollChange]);

  const getSectionData = (sectionIndex) => {
    if (sectionIndex === 0) return portfolioData.intro;
    if (sectionIndex === 1) return { type: 'work-experience' };
    if (sectionIndex === portfolioData.jobs.length + 2) return portfolioData.contact;
    return portfolioData.jobs[sectionIndex - 2];
  };

  const scrollToSection = (sectionIndex) => {
    const sectionHeight = window.innerHeight;
    const scrollPosition = sectionIndex * sectionHeight;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="portfolio-container">
      {/* Navigation */}
      <nav className="portfolio-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <h2>Portfolio</h2>
          </div>
          <div className="nav-sections">
            <button 
              className={`nav-item ${currentSection === 0 ? 'active' : ''}`}
              onClick={() => scrollToSection(0)}
            >
              Intro
            </button>
            <button 
              className={`nav-item ${currentSection === 1 ? 'active' : ''}`}
              onClick={() => scrollToSection(1)}
            >
              Work Experience
            </button>
            {portfolioData.jobs.map((job, index) => (
              <button 
                key={job.id}
                className={`nav-item ${currentSection === index + 2 ? 'active' : ''}`}
                onClick={() => scrollToSection(index + 2)}
              >
                {job.company}
              </button>
            ))}
            <button 
              className={`nav-item ${currentSection === portfolioData.jobs.length + 2 ? 'active' : ''}`}
              onClick={() => scrollToSection(portfolioData.jobs.length + 2)}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Progress indicator */}
      <div className="scroll-progress">
        <div 
          className="progress-bar"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Portfolio sections */}
      <div className="portfolio-sections">
        <IntroSection 
          data={portfolioData.intro} 
          deviceType={deviceType}
          isActive={currentSection === 0}
        />
        
        <WorkExperienceSection
          deviceType={deviceType}
          isActive={currentSection === 1}
          onGlobeScroll={onScrollChange}
        />
        
        {portfolioData.jobs.map((job, index) => (
          <JobSection
            key={job.id}
            data={job}
            deviceType={deviceType}
            isActive={currentSection === index + 2}
            sectionIndex={index + 3}
          />
        ))}
        
        <ContactSection
          data={portfolioData.contact}
          deviceType={deviceType}
          isActive={currentSection === portfolioData.jobs.length + 2}
        />
      </div>
    </div>
  );
};

export default PortfolioContainer;
