import { Link, useLocation } from 'react-router-dom';
import { Upload, Search, Bot, Menu, Info } from 'lucide-react';
import logoImage from '../assets/NOTEMATE-01.png';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logoImage} alt="Notemate Logo" style={{ height: '40px', width: 'auto' }} />
          <span className="logo-text text-gradient" style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '1px' }}>NOTEMATE</span>
        </Link>
        <div className="navbar-links">
          <Link to="/upload" className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`} title="Upload">
            <Upload size={22} />
          </Link>
          <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`} title="Search">
            <Search size={22} />
          </Link>
          <Link to="/ai-assistance" className={`nav-link ${location.pathname === '/ai-assistance' ? 'active' : ''}`} title="AI Assistance">
             <Bot size={22} />
          </Link>
          <Link to="/menu" className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`} title="Menu">
             <Menu size={22} />
          </Link>
          <Link to="/information" className={`nav-link ${location.pathname === '/information' ? 'active' : ''}`} title="Information">
             <Info size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
