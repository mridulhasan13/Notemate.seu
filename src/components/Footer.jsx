import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import './Footer.css';
import logoImage from '../assets/NOTEMATE-01.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', paddingTop: '1rem' }}>
        
        {/* Brand */}
        <Link to="/" className="footer-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textDecoration: 'none', margin: 0 }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src={logoImage} alt="Notemate Logo" style={{ height: '56px', width: 'auto' }} />
          <span className="logo-text text-gradient" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '2px' }}>NOTEMATE</span>
        </Link>
        
      </div>
      
      <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', padding: '0.75rem 0', background: 'rgba(0, 0, 0, 0.3)' }}>
        <div className="container bottom-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
            Note Sharing site for <span style={{ color: '#fbbf24', fontWeight: 600 }}>Southeast University</span>
          </p>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
            All rights reserved by NoteMate
          </p>
        </div>
      </div>
    </footer>
  );
}
