import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import IntroSection from './sections/IntroSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';
import './PortfolioContainer.css';

const PortfolioContainer = ({ onScrollChange, deviceType }) => {
  const containerRef = useRef(null);
  const scrollAnimationFrameRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastReportedSectionRef = useRef(-1);
  const totalSections = 6;

  const portfolioData = useMemo(() => ({
    intro: {
      title: "Liam Degand",
      subtitle: "Computer Science Student & Full-Stack Developer",
      description: "Passionate about technology and software development. Currently pursuing a Bachelor of Science in Computer Science at the University of Victoria, with hands-on experience in full-stack development, data analysis, and emerging technologies.",
      location: "Victoria, BC, Canada",
      email: "degandliam013@gmail.com",
      phone: "1 (819) 664-4427",
      image: "/api/placeholder/400/300"
    },
    skills: {
      title: "Technical Skills",
      categories: [
        {
          name: "Programming",
          skills: ["Python", "C", "Java", "Assembly", "Bash", "Git"]
        },
        {
          name: "Data Analysis", 
          skills: ["MS Excel", "SQL"]
        },
        {
          name: "Web Development",
          skills: ["HTML", "CSS", "Node.js", "React"]
        },
        {
          name: "Operating Systems",
          skills: ["Linux", "MS Windows"]
        },
        {
          name: "Software & Tools",
          skills: ["VS Code", "Microchip Studio", "Apache Airflow", "MongoDB", "AWS", "Azure", "GNU Radio", "STM32 Cube IDE"]
        }
      ]
    },
    experience: [
      {
        id: 1,
        company: "University of Victoria",
        position: "Teaching Assistant",
        duration: "Sept 2025 – Present",
        location: "Victoria, BC",
        description: "Assisting Dr. Yan with teaching CSC105 Computers and Information Processing class. Responsible for directing labs twice a week as well as grading and invigilating exams throughout the semester.",
        details: [
          "Topics include microcomputers, word processing, spreadsheets, database systems, communication, networks, and Python programming",
          "Managing lab sessions and student assessments"
        ],
        technologies: ["Python", "Database Systems", "Computer Fundamentals"],
        globeRotation: { x: 0, y: Math.PI / 4, z: 0 }
      },
      {
        id: 2,
        company: "National Research Council",
        position: "Full Stack Developer Co-op (Hybrid)",
        duration: "May 2025 – Sept 2025",
        location: "Ottawa, ON",
        description: "Added new features, debugged and triaged the staff portal. Improved an existing NLP model by applying a multi-task approach using PyTorch and Pandas.",
        details: [
          "Developed features using MUI, React, and Node.js for staff portal",
          "Enhanced middleware functionality with C# connected to SQL database",
          "Researched and implemented multi-task NLP model improvements",
          "Tested accuracy using Python libraries PyTorch and Pandas"
        ],
        technologies: ["React", "Node.js", "C#", "SQL", "Python", "PyTorch", "Pandas", "MUI"],
        globeRotation: { x: Math.PI / 6, y: Math.PI / 2, z: 0 }
      },
      {
        id: 3,
        company: "Advanced Symbolics",
        position: "Support Engineer Intern (Remote)",
        duration: "May 2023 – Aug 2023",
        location: "Ottawa, ON",
        description: "Triaged code failures, searched for root causes, and reported results to team members. Learned Apache Airflow, AWS, and MongoDB to streamline workflow processes.",
        details: [
          "Facilitated agile workflow as part of a team of 8",
          "Created Python scripts to search databases for triaging and bug solving",
          "Streamlined tasks for smoother workflow processes"
        ],
        technologies: ["Python", "Apache Airflow", "AWS", "MongoDB"],
        globeRotation: { x: -Math.PI / 4, y: Math.PI, z: 0 }
      }
    ],
    projects: [
      {
        id: 1,
        title: "MARMOTSAT Communication Protocol",
        organization: "UVic Satellite Club",
        duration: "Jan 2025 – Present",
        description: "Leading a team of 7 to implement a communication protocol designed for satellite launch in collaboration with UVic's Center for Aerospace Research.",
        details: [
          "Designed UDP-based communication protocol",
          "Leading team of 7 students",
          "Collaborating with University of Victoria's Center for Aerospace Research"
        ],
        technologies: ["UDP", "Communication Protocols", "Team Leadership"],
        globeRotation: { x: 0, y: Math.PI / 3, z: 0 }
      },
      {
        id: 2,
        title: "AWS DeepRacer AI Optimization",
        organization: "University of Victoria",
        duration: "Nov 2024",
        description: "Worked as part of a team to optimize the reward function on an existing AI racing model, following full software development life cycle.",
        details: [
          "Configured team repository and structured workflow through Git issues",
          "Implemented reward function optimization",
          "Fixed last-minute bugs and issues"
        ],
        technologies: ["AWS", "AI/ML", "Git", "Python"],
        globeRotation: { x: Math.PI / 8, y: Math.PI / 1.5, z: 0 }
      }
    ],
    education: {
      title: "Education",
      degree: "Bachelor of Science – Computer Science",
      institution: "University of Victoria",
      duration: "Sep 2022 – Present",
      location: "Victoria, BC",
      currentCourses: ["Data Mining", "Database Systems", "Simulations in Operations Research"],
      description: "Pursuing comprehensive computer science education with focus on practical applications and emerging technologies."
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Ready to work together?",
      description: "I'm always interested in new opportunities and exciting projects. Whether you have a question about my work or want to discuss a potential collaboration, I'd love to hear from you.",
      email: "degandliam013@gmail.com",
      phone: "1 (819) 664-4427",
      location: "Victoria, BC, Canada"
    }
  }), []);

  // Handle scroll progress and section changes
  const getSectionData = useCallback((sectionIndex) => {
    if (sectionIndex === 0) return portfolioData.intro;
    if (sectionIndex === 1) return portfolioData.skills;
    if (sectionIndex === 2) return { type: 'experience', data: portfolioData.experience };
    if (sectionIndex === 3) return { type: 'projects', data: portfolioData.projects };
    if (sectionIndex === 4) return portfolioData.education;
    if (sectionIndex === 5) {
      return {
        ...portfolioData.contact,
        type: 'contact-info'
      };
    }
    return portfolioData.intro;
  }, [portfolioData]);

  const setActiveSection = useCallback((sectionIndex, progressValue) => {
    setCurrentSection((prevSection) => (prevSection === sectionIndex ? prevSection : sectionIndex));

    const normalizedProgress = (() => {
      if (typeof progressValue === 'number' && !Number.isNaN(progressValue)) {
        return Math.min(Math.max(progressValue, 0), 1);
      }
      if (totalSections > 1) {
        return sectionIndex / (totalSections - 1);
      }
      return 0;
    })();

    setScrollProgress((prevProgress) => (
      Math.abs(prevProgress - normalizedProgress) < 0.001 ? prevProgress : normalizedProgress
    ));

    if (onScrollChange && lastReportedSectionRef.current !== sectionIndex) {
      lastReportedSectionRef.current = sectionIndex;
      const sectionData = getSectionData(sectionIndex);
      onScrollChange({
        section: sectionIndex,
        data: sectionData,
        progress: normalizedProgress
      });
    }
  }, [getSectionData, onScrollChange, totalSections]);

  useEffect(() => {
    setActiveSection(0);
  }, [setActiveSection]);

  useEffect(() => {
    const updateScrollState = () => {
      const container = containerRef.current;
      if (!container) return;

      const sections = Array.from(
        container.querySelectorAll('.portfolio-sections > .section')
      );

      if (!sections.length) return;

      const viewportReference = window.innerHeight * 0.35;
      let activeIndex = 0;
      let smallestDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportReference);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          activeIndex = index;
        }
      });

      const doc = document.documentElement;
      const totalScrollable = doc.scrollHeight - doc.clientHeight;
      const scrollTop = doc.scrollTop || window.pageYOffset;
      const progress = totalScrollable > 0
        ? scrollTop / totalScrollable
        : activeIndex / Math.max(totalSections - 1, 1);

      setActiveSection(activeIndex, progress);
    };

    const handleScroll = () => {
      if (scrollAnimationFrameRef.current !== null) return;

      scrollAnimationFrameRef.current = window.requestAnimationFrame(() => {
        scrollAnimationFrameRef.current = null;
        updateScrollState();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    updateScrollState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrameRef.current);
        scrollAnimationFrameRef.current = null;
      }
    };
  }, [setActiveSection, totalSections]);

  const scrollToSection = useCallback((sectionIndex) => {
    const sections = Array.from(
      containerRef.current?.querySelectorAll('.portfolio-sections > .section') || []
    );
    const targetSection = sections[sectionIndex];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionIndex);
  }, [setActiveSection]);

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
              About
            </button>
            <button 
              className={`nav-item ${currentSection === 1 ? 'active' : ''}`}
              onClick={() => scrollToSection(1)}
            >
              Skills
            </button>
            <button 
              className={`nav-item ${currentSection === 2 ? 'active' : ''}`}
              onClick={() => scrollToSection(2)}
            >
              Experience
            </button>
            <button 
              className={`nav-item ${currentSection === 3 ? 'active' : ''}`}
              onClick={() => scrollToSection(3)}
            >
              Projects
            </button>
              <button 
              className={`nav-item ${currentSection === 4 ? 'active' : ''}`}
              onClick={() => scrollToSection(4)}
              >
              Education
              </button>
            <button 
              className={`nav-item ${currentSection === 5 ? 'active' : ''}`}
              onClick={() => scrollToSection(5)}
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
        
        <SkillsSection
          data={portfolioData.skills}
          deviceType={deviceType}
          isActive={currentSection === 1}
        />
        
        <ExperienceSection
          data={portfolioData.experience}
          deviceType={deviceType}
          isActive={currentSection === 2}
        />
        
        <ProjectsSection
          data={portfolioData.projects}
          deviceType={deviceType}
          isActive={currentSection === 3}
        />
        
        <EducationSection
          data={portfolioData.education}
          deviceType={deviceType}
          isActive={currentSection === 4}
        />
        
        <ContactSection
          data={portfolioData.contact}
          deviceType={deviceType}
          isActive={currentSection === 5}
        />
      </div>
    </div>
  );
};

export default PortfolioContainer;
