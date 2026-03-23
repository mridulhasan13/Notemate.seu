import React from 'react';
import { Link } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import './Home.css';

export default function MenuPage() {
  const menuItems = [
    { name: 'Lecture Notes', icon: FileText, path: '/departments/note', desc: 'Class summaries and hand-written notes' },
    { name: 'Lab Reports', icon: FlaskConical, path: '/departments/lab-report', desc: 'Experiment results and documentation' },
    { name: 'Assignments', icon: ClipboardList, path: '/departments/assignment', desc: 'Solved assignments and tasks' },
    { name: 'Presentations', icon: Presentation, path: '/departments/presentation', desc: 'Slides and speech materials' },
    { name: 'Question Bank', icon: HelpCircle, path: '/departments/question-bank', desc: 'Old questions and exam patterns' },
    { name: 'Syllabus', icon: BookOpen, path: '/departments/syllabus', desc: 'Course outlines and curriculum' },
    { name: 'Credit Plan', icon: Award, path: '/departments/credit-plan', desc: 'Departmental degree requirements' },
    { name: 'Submit Note', icon: Upload, path: '/upload', desc: 'Share your materials with the community' },
    { name: 'Teachers Info', icon: Users, path: '/teachers', desc: 'Faculty contact and office info' },
  ];

  return (
    <div className="menu-page container animate-fade-in" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="hero-title">Academic <span className="text-gradient">Menu</span></h1>
        <p className="subtitle">Everything you need for your university journey, in one place.</p>
      </div>

      <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} to={item.path} className="menu-item glass-panel" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              padding: '1.5rem', 
              textDecoration: 'none',
              transition: 'transform 0.3s ease'
            }}>
              <div className="menu-icon-bg" style={{ 
                background: 'var(--glass-bg)', 
                padding: '1rem', 
                borderRadius: '12px',
                color: 'var(--accent-primary)'
              }}>
                <Icon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{item.name}</h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
              <ChevronRight size={18} className="text-muted" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
