import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import './Footer.css';
import logoImage from '../assets/NOTEMATE-01.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logoImage} alt="Notemate Logo" style={{ height: '30px', width: 'auto' }} />
            <span className="logo-text text-gradient" style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '1px' }}>NOTEMATE</span>
          </Link>
          <p className="footer-description">
            The ultimate university knowledge base. A smarter way to study, share, and succeed together.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link"><Twitter size={20} /></a>
            <a href="#" className="social-link"><Github size={20} /></a>
            <a href="#" className="social-link"><Linkedin size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h3>Resources</h3>
            <Link to="/browse?type=note">Notes</Link>
            <Link to="/browse?type=lab">Lab Reports</Link>
            <Link to="/browse?type=assignment">Assignments</Link>
            <Link to="/browse?type=presentation">Presentations</Link>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; {new Date().getFullYear()} Notemate. All rights reserved.</p>
          <p className="made-with">Made with <Heart size={14} className="heart-icon" /> for students</p>
        </div>
      </div>
    </footer>
  );
}
