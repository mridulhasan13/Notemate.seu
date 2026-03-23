import { Link, useLocation } from 'react-router-dom';
import { Upload, Search, Bot, Menu, Info } from 'lucide-react';
import logoImage from '../assets/NOTEMATE-01.png';
import './Navbar.css';

export default function Navbar({ onSearchClick, onMenuClick }) {
  const location = useLocation();

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => { if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src={logoImage} alt="Notemate Logo" style={{ height: '40px', width: 'auto' }} />
          <span className="logo-text text-gradient" style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '1px' }}>NOTEMATE</span>
        </Link>
        <div className="navbar-links">
          <Link to="/upload" className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`} title="Upload Materials">
            <Upload size={22} />
          </Link>
          <button 
            className="nav-link search-trigger-btn" 
            onClick={onSearchClick} 
            title="Search Everything"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <Search size={22} />
          </button>
          <Link to="/ai-assistance" className={`nav-link ${location.pathname === '/ai-assistance' ? 'active' : ''}`} title="AI Help">
             <Bot size={22} />
          </Link>
          <Link to="/information" className={`nav-link ${location.pathname === '/information' ? 'active' : ''}`} title="App Info">
             <Info size={22} />
          </Link>
          <button 
            className="nav-link menu-trigger-btn" 
            onClick={onMenuClick} 
            title="Open Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
             <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
