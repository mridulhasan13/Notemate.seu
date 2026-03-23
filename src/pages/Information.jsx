import React from 'react';
import { 
  Info, 
  Globe, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Github, 
  Heart, 
  Rocket, 
  ShieldCheck,
  Target
} from 'lucide-react';
import nazmulImg from '../assets/nazmul.png';
import mridulImg from '../assets/Untitled design.png';
import seuLogo from '../assets/image.png';
import './Information.css';

export default function Information() {
    const founders = [
        {
            name: "Nazmul Hossain",
            role: "Co-Founder",
            dept: "CSE-70",
            id: "2025100000141",
            image: nazmulImg,
            socials: {
                globe: "#",
                facebook: "https://www.facebook.com/share/1WtyCW219R/",
                instagram: "https://www.instagram.com/brown_cyanide/",
                linkedin: "https://www.linkedin.com/in/nazmul-hossain-344514361/",
                github: "https://github.com/nazmulhossain250"
            }
        },
        {
            name: "Mahmudul Hasan Mridul",
            role: "Co-Founder",
            dept: "IPE - BUTEX",
            image: mridulImg,
            socials: {
                globe: "https://mahmudulhasanmridul.netlify.app/",
                facebook: "https://www.facebook.com/mahmudulhasan.mridul01",
                instagram: "https://www.instagram.com/mustard_slevalion/",
                linkedin: "https://www.linkedin.com/in/mahmudul-hasan-mridul1/",
                github: "https://github.com/mridulhasan13"
            }
        }
    ];

    return (
        <div className="info-page animate-fade-in">
            {/* Mission Hero Section */}
            <section className="info-hero container">
                <div className="hero-logo-box animate-float">
                    <img src={seuLogo} alt="SEU Logo" className="hero-logo" />
                </div>
                <h1 className="hero-title">Academic <span className="text-gradient">Integrity</span></h1>
                <p className="hero-subtitle">Notemate is more than a resource hub—it's a movement to democratize learning and centralize academic excellence at Southeast University.</p>
            </section>

            <div className="section-divider container"></div>

            {/* The "Why" Section */}
            <section className="mission-section container">
                <div className="mission-grid">
                    <div className="mission-card glass-panel">
                        <Rocket size={32} className="mission-icon" />
                        <h3>The Vision</h3>
                        <p>To provide every SEU student with instant, free, and high-quality access to the collective knowledge of our community.</p>
                    </div>
                    <div className="mission-card glass-panel">
                        <ShieldCheck size={32} className="mission-icon" />
                        <h3>Reliability</h3>
                        <p>A secure, persistent database ensures your contributions are preserved for future generations of SEU scholars.</p>
                    </div>
                    <div className="mission-card glass-panel">
                        <Target size={32} className="mission-icon" />
                        <h3>Community</h3>
                        <p>Built by SEU students, for SEU students. Notemate thrives on the spirit of mutual academic support.</p>
                    </div>
                </div>
            </section>

            {/* Founders Section */}
            <section className="founders-section container">
                <h2 className="section-title">Founders <span className="text-gradient">Legacy</span></h2>
                <div className="founders-grid">
                    {founders.map((founder, idx) => (
                        <div key={idx} className="founder-card glass-panel animate-fade-in-up">
                            <div className="founder-image-wrapper">
                                <img src={founder.image} alt={founder.name} className="founder-image" />
                                <div className="founder-image-glow"></div>
                            </div>
                            <div className="founder-details">
                                <h3 className="founder-name">{founder.name}</h3>
                                <p className="founder-role">{founder.role}</p>
                                <div className="founder-meta">
                                    <span className="founder-dept">{founder.dept}</span>
                                    {founder.id && <span className="founder-id">ID: {founder.id}</span>}
                                </div>
                                <div className="founder-socials">
                                    <a href={founder.socials.globe} target="_blank" rel="noreferrer"><Globe size={18} /></a>
                                    <a href={founder.socials.facebook} target="_blank" rel="noreferrer"><Facebook size={18} /></a>
                                    <a href={founder.socials.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /></a>
                                    <a href={founder.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
                                    <a href={founder.socials.github} target="_blank" rel="noreferrer"><Github size={18} /></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
