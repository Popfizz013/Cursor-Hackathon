import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
// import { Canvas, useThree, useFrame } from '@react-three/fiber';
// import { OrbitControls, Environment, Stars } from '@react-three/drei';
// import Globe3D from '../../globe/Globe3D.jsx';
import '../../sections/SectionStyles.css';

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
					<h2 className="section-title">Work Experience</h2>
					<p className="section-description">
						Scroll to explore my professional journey through interactive 3D visualization
					</p>
				</motion.div>

				{/* 3D Globe Container - TEMPORARILY DISABLED */}
				{/* ...omitted for now... */}

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
							type="button"
							className="cta-button"
							onClick={() => {
								console.log('Launch 3D Globe clicked');
							}}
						>
							Launch 3D Globe
						</button>
					</div>
				</motion.div>

				{/* Work Timeline */}
				<motion.div 
					className="experience-timeline"
					variants={itemVariants}
				>
					{[
						{ year: '2023', role: 'Support Engineer Intern', company: 'Advanced Symbolics', location: 'Ottawa, ON' },
						{ year: '2024', role: 'Full Stack Developer Co-op', company: 'National Research Council', location: 'Ottawa, ON' },
						{ year: '2025', role: 'Teaching Assistant', company: 'University of Victoria', location: 'Victoria, BC' }
					].map((item, index) => (
						<div
							key={index}
							className="timeline-item"
						>
							<div className="timeline-marker"></div>
							<div className="timeline-content">
								<h4>{item.role}</h4>
								<p>{item.company}</p>
								<div className="job-meta">
									<span className="job-duration">{item.year}</span>
									<span className="job-location">{item.location}</span>
								</div>
								<p className="timeline-description">
									Key projects and responsibilities during this period, highlighting technical achievements and impact.
								</p>
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
};

export default WorkExperienceSection;
