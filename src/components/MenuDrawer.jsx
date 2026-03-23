import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  FlaskConical, 
  ClipboardList, 
  Presentation, 
  HelpCircle, 
  BookOpen, 
  Upload, 
  Award, 
  Users,
  X,
  ChevronRight,
  Info
} from 'lucide-react';
import seuLogo from '../assets/image.png';
import notemateLogo from '../assets/NOTEMATE-01.png';
import './MenuDrawer.css';

export default function MenuDrawer({ isOpen, onClose }) {
  const location = useLocation();

  const menuItems = [
    { name: 'Lecture Notes', icon: FileText, path: '/departments/note', desc: 'Hand-written class materials' },
    { name: 'Lab Reports', icon: FlaskConical, path: '/departments/lab-report', desc: 'Experiment documentation' },
    { name: 'Assignments', icon: ClipboardList, path: '/departments/assignment', desc: 'Solved tasks and homework' },
    { name: 'Presentations', icon: Presentation, path: '/departments/presentation', desc: 'Slides and speech notes' },
    { name: 'Question Bank', icon: HelpCircle, path: '/departments/question-bank', desc: 'Previous years papers' },
    { name: 'Syllabus', icon: BookOpen, path: '/departments/syllabus', desc: 'Official course outlines' },
    { name: 'Credit Plan', icon: Award, path: '/departments/credit-plan', desc: 'Degree requirements' },
    { name: 'Submit Note', icon: Upload, path: '/upload', desc: 'Share your materials' },
    { name: 'Teachers Info', icon: Users, path: '/teachers', desc: 'Faculty contact details' },
    { name: 'Mission & Info', icon: Info, path: '/information', desc: 'Our vision and founders' },
  ];

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="menu-drawer-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="menu-drawer-content glass-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <Link 
            to="/" 
            onClick={onClose}
            className="drawer-logo-link"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <img src={notemateLogo} alt="Notemate" style={{ height: '30px', width: 'auto' }} />
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
              <img src={seuLogo} alt="SEU" style={{ height: '30px', width: 'auto' }} />
            </div>
            <h2 className="drawer-title">NoteMate <span className="text-gradient">Menu</span></h2>
          </Link>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="drawer-body custom-scrollbar">
          <div className="drawer-grid">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`drawer-item glass-panel ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <div className="drawer-icon-box">
                    <Icon size={20} />
                  </div>
                  <div className="drawer-item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-desc">{item.desc}</span>
                  </div>
                  <ChevronRight size={16} className="item-arrow" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="drawer-footer">
          <p>© 2026 Notemate SEU • Premium Edition</p>
        </div>
      </div>
    </div>
  );
}
