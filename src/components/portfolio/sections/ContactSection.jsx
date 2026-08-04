import React, { forwardRef } from 'react';
import '../../sections/SectionStyles.css';

const ContactSection = forwardRef(({ data, isActive }, ref) => {
	return (
		<section
			ref={ref}
			className={`contact-section section ${isActive ? 'active' : ''}`}
			data-section-index={6}
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
							<a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
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

						{data.github && (
							<div className="contact-card">
								<div className="contact-icon github-icon">
									<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
										<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.898-.015 3.293 0 .322.216.696.825.578C20.565 22.092 24 17.596 24 12.297c0-6.627-5.373-12-12-12"/>
									</svg>
								</div>
								<h4>GitHub</h4>
								<p>Code &amp; Projects</p>
								<a href={data.github} target="_blank" rel="noopener noreferrer" className="contact-link">
									View Profile
								</a>
							</div>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className="contact-footer">
					<p>&copy; 2024 Liam Degand. All rights reserved.</p>
					<p className="footer-built">
						<span>Built with React, Three.js, and lots of Claude tokens</span>
						<svg className="claude-mark" viewBox="0 0 24 24" aria-hidden="true">
							<g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
								{[0, 32.7, 65.5, 98.2, 130.9, 163.6, 196.4, 229.1, 261.8, 294.5, 327.3].map((angle) => (
									<line
										key={angle}
										x1="12"
										y1="12"
										x2="12"
										y2="2.8"
										transform={`rotate(${angle} 12 12)`}
									/>
								))}
							</g>
						</svg>
					</p>
				</div>
			</div>
		</section>
	);
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
