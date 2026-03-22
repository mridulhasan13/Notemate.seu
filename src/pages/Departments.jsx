import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Cpu, Zap, Scissors, Building, TrendingUp, BookOpen, Edit, Briefcase, Scale, FlaskConical, Monitor } from 'lucide-react';
import './Departments.css';

export default function Departments() {
  const { type } = useParams();

  // Format type for display (e.g., 'question-bank' -> 'Question Bank')
  const displayTitle = type 
    ? type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Resources';

  const departments = [
    { name: 'CSE', fullName: 'Computer Science & Engineering', icon: Cpu },
    { name: 'EEE', fullName: 'Electrical & Electronic Engineering', icon: Zap },
    { name: 'TE', fullName: 'Textile Engineering', icon: Scissors },
    { name: 'Arch', fullName: 'Architecture', icon: Building },
    { name: 'Economics', fullName: 'Economics', icon: TrendingUp },
    { name: 'English', fullName: 'English', icon: BookOpen },
    { name: 'Bangla', fullName: 'বাংলা ভাষা ও সাহিত্য', icon: Edit },
    { name: 'BBA', fullName: 'Business Administration', icon: Briefcase },
    { name: 'Law', fullName: 'Law', icon: Scale },
    { name: 'Pharmacy', fullName: 'Pharmacy', icon: FlaskConical },
    { name: 'ICT', fullName: 'Information & Comm. Technology', icon: Monitor }
  ];

  return (
    <div className="departments-page animate-fade-in" style={{ paddingTop: '2.5rem', paddingBottom: '0rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', margin: '0 auto 2rem auto', maxWidth: '700px' }}>
          <h1 className="hero-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Select Department for <span className="text-gradient">{displayTitle}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Choose your specific department to find the most relevant materials.
          </p>
        </div>

        <div className="depts-grid">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <Link 
                key={index} 
                to={`/browse?type=${type}&department=${dept.name}`} 
                className="dept-card glass-panel animate-fade-in" 
                style={{ animationDelay: `${index * 50}ms`, textDecoration: 'none' }}
              >
                <div className="dept-icon-wrapper">
                  <Icon size={24} color="var(--accent-primary)" />
                </div>
                <div className="dept-info">
                  <h3>{dept.name}</h3>
                  <p>{dept.fullName}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
