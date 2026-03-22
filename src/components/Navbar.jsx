import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Upload, User, Search } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <BookOpen className="logo-icon text-gradient" size={32} />
          <span className="logo-text">NoteMate</span>
        </Link>
        <div className="navbar-links">
          <Link to="/browse" className={`nav-link ${location.pathname === '/browse' ? 'active' : ''}`}>
            <Search size={18} /> Browse
          </Link>
          <Link to="/upload" className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}>
            <Upload size={18} /> Upload
          </Link>
          <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
             <User size={18} /> Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
