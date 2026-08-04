import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense, lazy } from 'react';
import GlobeErrorBoundary from '../globe/GlobeErrorBoundary.jsx';
import IntroSection from './sections/IntroSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import ExperienceSection from './sections/ExperienceSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import EducationSection from './sections/EducationSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import './PortfolioContainer.css';

// Lazy so three.js lives in its own chunk and stays out of the main bundle.
const GlobeBackdrop = lazy(() => import('../globe/GlobeBackdrop.jsx'));

const PortfolioContainer = ({ onScrollChange, deviceType }) => {
	const containerRef = useRef(null);
	const scrollAnimationFrameRef = useRef(null);
	const [currentSection, setCurrentSection] = useState(0);
	const [scrollProgress, setScrollProgress] = useState(0);
	const lastReportedSectionRef = useRef(-1);
	const totalSections = 7;

	const portfolioData = useMemo(() => ({
		intro: {
			title: "Liam Degand",
			subtitle: "Computer Science Student",
			description: "Computer science student at the University of Victoria, currently researching robotics security in ROS 2 with the ACIS Lab. Previously built staff-portal features and NLP tooling at the National Research Council, and led the communication protocol for a student-built satellite.",
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
					name: "Cybersecurity",
					skills: ["UDP", "TCP/IP", "Penetration Testing", "TryHackMe", "HackTheBox"]
				},
				{
					name: "Cloud Platforms",
					skills: ["AWS", "Azure", "CI/CD", "Docker", "Kubernetes"]
				},
				{
					name: "Operating Systems",
					skills: ["Linux", "MS Windows"]
				},
				{
					name: "Productivity Tools",
					skills: ["MS Office", "Google Suite", "Slack", "Trello"]
				},
				{
					name: "Software & Tools",
					skills: ["VS Code", "Microchip Studio", "Apache Airflow", "MongoDB", "GNU Radio", "STM32 Cube IDE"]
				}
			]
		},
		experience: [
			{
				id: 1,
				company: "ACIS Lab",
				position: "Robotics Security Intern",
				duration: "Sept 2025 – Present",
				location: "Victoria, BC",
				description: "Researching security in ROS 2 with a focus on the DDS and SROS2 frameworks, and quantifying what hardening a robotic system actually costs at runtime.",
				details: [
					"Designed experiments comparing unsecured vs. encrypted communication for data protection and access control",
					"Configured SROS2 security policies, keystores, and enclaves",
					"Simulated command injection attacks on robotic systems and evaluated mitigation strategies",
					"Measured latency overhead of security mechanisms and analyzed performance trade-offs"
				],
				technologies: ["ROS 2", "DDS", "SROS2", "Linux", "Penetration Testing"]
			},
			{
				id: 2,
				company: "University of Victoria",
				position: "Teaching Assistant",
				duration: "Sept 2025 – April 2026",
				location: "Victoria, BC",
				description: "Assisting Dr. Yu Yan and Prashanti Priya Angara with teaching the CSC105 Computers and Information Processing class. Responsible for directing labs twice a week as well as grading and invigilating exams throughout the semester.",
				details: [
					"Topics include microcomputers, word processing, spreadsheets, database systems, communication, networks, and Python programming",
					"Managing lab sessions and student assessments"
				],
				technologies: ["Python", "Database Systems", "Computer Fundamentals"]
			},
			{
				id: 3,
				company: "National Research Council",
				position: "Full Stack Developer Co-op (Hybrid)",
				duration: "May 2025 – Sept 2025",
				location: "Ottawa, ON",
				description: "Added new features, debugged and triaged the staff portal my team was building in house. Improved an existing NLP model by applying a multi-task approach using PyTorch and Pandas.",
				details: [
					"Developed features using MUI, React, and Node.js for staff portal",
					"Enhanced middleware functionality with C# connected to SQL database",
					"Researched and implemented multi-task NLP model improvements",
					"Tested accuracy using Python libraries PyTorch and Pandas"
				],
				technologies: ["React", "Node.js", "C#", "SQL", "Python", "PyTorch", "Pandas", "MUI"]
			},
			{
				id: 4,
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
				technologies: ["Python", "Apache Airflow", "AWS", "MongoDB"]
			},
			{
				id: 5,
				company: "The Bear Bierhause · La Station · La Favorita · Le Forum",
				position: "Cook",
				duration: "Aug 2021 – Aug 2024",
				location: "BC, QC & ON, Canada",
				description: "Multitasked by staying attentive to incoming orders while managing dish preparation in a fast-paced, high-intensity environment, communicating effectively as a team to synchronize meal components.",
				details: [
					"The Bear Bierhause — Tofino, BC (May 2024 – Aug 2024)",
					"La Station Restaurant — Hull, QC (May 2023 – Aug 2023)",
					"La Favorita Restaurant — Ottawa, ON (Dec 2021 – May 2022)",
					"Le Forum Restaurant — Gatineau, QC (Aug 2021 – Nov 2021, May 2022 – Sept 2022)"
				]
			}
		],
		projects: [
			{
				id: 1,
				title: "EchoShield",
				organization: "UVic Hacks Startup Hackathon",
				duration: "Feb 2026",
				repo: "https://github.com/Popfizz013/EchoShield",
				description: "A full-stack AI safety lab that classifies prompts as safe or unsafe, then runs an adversarial mutation search to find the smallest change that flips the verdict.",
				details: [
					"Built a three-tier architecture: React/Vite frontend, Node.js middleware, and a Python inference backend",
					"Implemented the Echogram search that hunts for minimal prompt modifications which bypass a guardrail",
					"Visualized the search as nodes, edges, and the mutation path to a potential bypass",
					"Supported multiple guardrail model IDs with fallback behaviour when model access is unavailable"
				],
				technologies: ["TypeScript", "React", "Vite", "Node.js", "Express", "Python", "Docker"]
			},
			{
				id: 2,
				title: "SecureUSB",
				organization: "UVEC Hackathon · Systems Architect & Team Lead",
				duration: "Oct 2025",
				repo: "https://github.com/Popfizz013/SecureUSB",
				description: "A cross-platform CLI that detects USB drives on insertion and locks them behind password-derived AES-256-GCM encryption. Led a team of three as systems architect.",
				details: [
					"Real-time USB insertion and removal detection across Windows and macOS",
					"Password authentication with PBKDF2 key derivation over salted, hashed keys",
					"AES-256-GCM batch encryption with SHA-256 integrity verification and secure deletion of originals",
					"Retry-limited unlock, per-device UUID metadata, and multi-device management"
				],
				technologies: ["Python", "AES-256-GCM", "PBKDF2", "SHA-256", "Shell", "PowerShell"]
			},
			{
				id: 3,
				title: "MARMOTSAT Communication Protocol",
				organization: "UVic Satellite Club",
				duration: "Jan 2025 – Oct 2025",
				description: "Leading a team of 7 to implement a communication protocol designed for satellite launch in collaboration with UVic's Center for Aerospace Research.",
				details: [
					"Designed UDP-based communication protocol",
					"Leading team of 7 students",
					"Collaborating with University of Victoria's Center for Aerospace Research"
				],
				technologies: ["UDP", "Communication Protocols", "Team Leadership"]
			},
			{
				id: 4,
				title: "AWS DeepRacer AI Optimization",
				organization: "University of Victoria",
				duration: "Nov 2024",
				description: "Worked as part of a team to optimize the reward function on an existing AI racing model, following full software development life cycle.",
				details: [
					"Configured team repository and structured workflow through Git issues",
					"Implemented reward function optimization",
					"Fixed last-minute bugs and issues"
				],
				technologies: ["AWS", "AI/ML", "Git", "Python"]
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
			location: "Victoria, BC, Canada",
			github: "https://github.com/Popfizz013",
			linkedin: "https://www.linkedin.com/in/liam-degand-800592276/"
		}
	}), []);

	// Handle scroll progress and section changes
	const getSectionData = useCallback((sectionIndex) => {
		if (sectionIndex === 0) return portfolioData.intro;
		if (sectionIndex === 1) return portfolioData.skills;
		if (sectionIndex === 2) return { type: 'globe' };
		if (sectionIndex === 3) return { type: 'experience', data: portfolioData.experience };
		if (sectionIndex === 4) return { type: 'projects', data: portfolioData.projects };
		if (sectionIndex === 5) return portfolioData.education;
		if (sectionIndex === 6) {
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
			{/* Ambient 3D globe — eases toward a per-section pose as you scroll */}
			{/* Phones skip the globe entirely — because GlobeBackdrop is lazy,
			    not rendering it means the three.js chunk is never fetched and
			    no WebGL context is created. The interlude's scroll runway is
			    collapsed to match (see .globe-section in SectionStyles.css). */}
			{deviceType !== 'mobile' && (
				<GlobeErrorBoundary>
					<Suspense fallback={null}>
						<GlobeBackdrop
							section={currentSection}
							progress={scrollProgress}
							deviceType={deviceType}
						/>
					</Suspense>
				</GlobeErrorBoundary>
			)}

			{/* Navigation */}
			<nav className="portfolio-nav">
				<div className="nav-content">
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
							className={`nav-item ${currentSection === 3 ? 'active' : ''}`}
							onClick={() => scrollToSection(3)}
						>
							Experience
						</button>
						<button
							className={`nav-item ${currentSection === 4 ? 'active' : ''}`}
							onClick={() => scrollToSection(4)}
						>
							Projects
						</button>
							<button
							className={`nav-item ${currentSection === 5 ? 'active' : ''}`}
							onClick={() => scrollToSection(5)}
							>
							Education
							</button>
						<button
							className={`nav-item ${currentSection === 6 ? 'active' : ''}`}
							onClick={() => scrollToSection(6)}
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

				{/* Full-viewport stage for the globe — the fixed backdrop reveals
				    centred here, with nothing else on screen */}
				<section
					className="section globe-section"
					data-section-index={2}
					aria-hidden="true"
				/>

				<ExperienceSection
					data={portfolioData.experience}
					deviceType={deviceType}
					isActive={currentSection === 3}
				/>

				<ProjectsSection
					data={portfolioData.projects}
					deviceType={deviceType}
					isActive={currentSection === 4}
				/>

				<EducationSection
					data={portfolioData.education}
					deviceType={deviceType}
					isActive={currentSection === 5}
				/>

				<ContactSection
					data={portfolioData.contact}
					deviceType={deviceType}
					isActive={currentSection === 6}
				/>
			</div>
		</div>
	);
};

export default PortfolioContainer;
