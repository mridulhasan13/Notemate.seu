import { ArrowRight, Search, Sparkles, FileText, FlaskConical, ClipboardList, Presentation, HelpCircle, BookOpen, Upload, Award, Users, Facebook, Instagram, Linkedin, Github, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import Button from '../components/Button';
import './Home.css';
import nazmulImg from '../assets/nazmul.png';
import mridulImg from '../assets/Untitled design.png';

export default function Home() {
  const categories = [
    { name: 'Note', icon: FileText, path: '/departments/note' },
    { name: 'Lab Report', icon: FlaskConical, path: '/departments/lab-report' },
    { name: 'Assignment', icon: ClipboardList, path: '/departments/assignment' },
    { name: 'Presentation', icon: Presentation, path: '/departments/presentation' },
    { name: 'Question Bank', icon: HelpCircle, path: '/departments/question-bank' },
    { name: 'Syllabus', icon: BookOpen, path: '/departments/syllabus' },
    { name: 'Submit Note', icon: Upload, path: '/upload' },
    { name: 'Credit plan', icon: Award, path: '/departments/credit-plan' },
    { name: 'Teachers information', icon: Users, path: '/departments/teachers' },
  ];


  const recentNotes = [
    { id: 1, title: 'Microeconomics Midterm Prep' },
    { id: 2, title: 'Data Structures Compendium' },
    { id: 3, title: 'Cell Biology Notes Chapter 4-6' },
  ];

  return (
    <div className="home-page animate-fade-in" style={{ paddingTop: '4rem' }}>
      <section className="container">
        <h1 className="hero-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Explore <span className="text-gradient">Resources</span>
        </h1>
        
        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link to={category.path} key={category.name} className="category-pill glass-panel" style={{ minWidth: '220px', padding: '1.5rem', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                <Icon size={32} className="category-icon" />
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{category.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Built By Section */}
      <section className="container animate-fade-in delay-400" style={{ marginTop: '8rem', paddingBottom: '4rem' }}>
        <div style={{ height: '1px', background: 'var(--glass-border)', width: '100%', marginBottom: '4rem' }}></div>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2rem', letterSpacing: '1px', color: 'var(--text-primary)' }}>
          Built <span className="text-gradient">By</span>
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap' }}>
          
          {/* Member 1: Nazmul Hossain */}
          <div 
            className="glass-panel founder-card-interactive" 
            onClick={() => navigate('/information')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 2rem', width: '320px', flexGrow: 1, maxWidth: '380px', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}
          >
            <img 
              src={nazmulImg} 
              alt="Nazmul Hossain" 
              style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '1.5rem', border: '5px solid rgba(235, 106, 76, 0.2)', objectFit: 'cover' }} 
            />
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600' }}>Nazmul Hossain</h3>
            <p style={{ margin: 0, color: 'var(--accent-primary)', fontSize: '1.15rem', fontWeight: '700', letterSpacing: '2px' }}>CSE-70</p>
            <p style={{ margin: '0.2rem 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>ID: 2025100000141</p>
            
            <div className="team-socials" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
              <a href="#" target="_blank" rel="noopener noreferrer"><Globe size={20} /></a>
              <a href="https://www.facebook.com/share/1WtyCW219R/" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/brown_cyanide/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/in/nazmul-hossain-344514361/" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
              <a href="https://github.com/nazmulhossain250" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
            </div>
          </div>

          {/* Member 2: Mahmudul */}
          <div 
            className="glass-panel founder-card-interactive" 
            onClick={() => navigate('/information')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 2rem', width: '320px', flexGrow: 1, maxWidth: '380px', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}
          >
            <img 
              src={mridulImg} 
              alt="Mahmudul Hasan Mridul" 
              style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '1.5rem', border: '5px solid rgba(235, 106, 76, 0.2)', objectFit: 'cover' }} 
            />
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600' }}>Mahmudul Hasan Mridul</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: 'var(--accent-primary)', fontSize: '1.15rem', fontWeight: '700', letterSpacing: '2px' }}>IPE</p>

            <div className="team-socials" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
              <a href="https://mahmudulhasanmridul.netlify.app/" target="_blank" rel="noopener noreferrer"><Globe size={20} /></a>
              <a href="https://www.facebook.com/mahmudulhasan.mridul01" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/mustard_slevalion/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/in/mahmudul-hasan-mridul1/" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
              <a href="https://github.com/mridulhasan13" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
