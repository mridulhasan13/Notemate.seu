import React, { useState, useMemo } from 'react';
import { Search, Mail, Phone, MapPin, Linkedin, Globe, BookOpen, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { facultyData } from '../data/facultyData';
import './Teachers.css';

export default function Teachers() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const initialSearch = queryParams.get('search') || '';
  const departmentParam = queryParams.get('department') || 'CSE';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState('Faculty'); // 'Faculty', 'Adjacent Faculty', 'Officer & Staff'

  const filteredData = useMemo(() => {
    return facultyData.filter(person => {
      const matchesDept = departmentParam === 'All' || !person.department || person.department === departmentParam;
      const matchesTab = person.category === activeTab;
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        (person.name && person.name.toLowerCase().includes(term)) ||
        (person.designation && person.designation.toLowerCase().includes(term)) ||
        (person.email && person.email.toLowerCase().includes(term)) ||
        (person.room && person.room.toLowerCase().includes(term));
      
      return matchesDept && matchesTab && matchesSearch;
    });
  }, [searchTerm, activeTab, departmentParam]);

  const tabs = ['Faculty', 'Adjacent Faculty', 'Officer & Staff'];

  return (
    <div className="teachers-page animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', margin: '0 auto 3rem auto', maxWidth: '800px' }}>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {departmentParam === 'All' ? 'Global' : departmentParam} Department <span className="text-gradient">Directory</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Find contact information, office locations, and profiles of our faculty and staff.
          </p>
        </div>

        {/* Search Bar */}
        <div className="teacher-search-section" style={{ margin: '0 auto 3rem auto', maxWidth: '600px', position: 'relative' }}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, designation, email, or room..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input glass-panel"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="filter-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="teachers-grid">
          {filteredData.length > 0 ? (
            filteredData.map((person, idx) => (
              <div 
                key={person.id || idx}
                className="glass-panel teacher-card" 
                style={{ animationDelay: `${(idx % 10) * 50}ms` }}
              >
                <div className="teacher-image-wrapper">
                  {person.image ? (
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="teacher-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`; }}
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {person.name ? person.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                </div>
                
                <h3 className="teacher-name">{person.name}</h3>
                <p className="teacher-role">{person.type ? `${person.designation} (${person.type})` : person.designation}</p>

                <div className="teacher-details">
                  {person.email && (
                    <div className="detail-item">
                      <Mail size={14} />
                      <a href={`mailto:${person.email.split(',')[0].trim()}`}>{person.email.split(',')[0].trim()}</a>
                    </div>
                  )}
                  {person.phone && (
                    <div className="detail-item">
                      <Phone size={14} />
                      <span>{person.phone}</span>
                    </div>
                  )}
                  {person.room && (
                    <div className="detail-item">
                      <MapPin size={14} />
                      <span>{person.room}</span>
                    </div>
                  )}
                </div>

                <div className="teacher-socials">
                  {person.socials?.linkedin && (
                    <a href={person.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={16} /></a>
                  )}
                  {person.socials?.scholar && (
                    <a href={person.socials.scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar"><BookOpen size={16} /></a>
                  )}
                  {person.socials?.researchgate && (
                    <a href={person.socials.researchgate} target="_blank" rel="noopener noreferrer" title="ResearchGate"><Globe size={16} /></a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results glass-panel" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
              <Users size={48} style={{ opacity: 0.2, marginBottom: '1rem', margin: '0 auto' }} />
              <h3>No results found</h3>
              <p>Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
