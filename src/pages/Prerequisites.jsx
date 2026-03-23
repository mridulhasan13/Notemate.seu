import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, BookOpen, ExternalLink } from 'lucide-react';
import { prerequisitesData, courseCodes, reverseMapping } from '../data/prerequisites';
import './Prerequisites.css';

export default function Prerequisites() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(courseName);
  
  // Try to find by code first if needed, but usually it's by name
  const cleanName = decodedName.replace(' All notes', '').replace(' Report', '');
  const actualName = reverseMapping[cleanName] || cleanName;
  const prerequisites = prerequisitesData[actualName] || [];
  const currentCode = courseCodes[actualName] || '';

  return (
    <div className="prerequisites-page container animate-fade-in">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="prerequisites-container glass-panel">
        <div className="header">
          <Info size={32} className="text-gradient" />
          <h1>Course Requirements</h1>
          <div className="course-info">
            <span className="code-badge">{currentCode}</span>
            <p className="text-secondary">{actualName}</p>
          </div>
        </div>

        <div className="content">
          <h3>Required Prerequisites</h3>
          {prerequisites.length > 0 ? (
            <div className="prereq-list">
              {prerequisites.map((prereq) => (
                <Link 
                  key={prereq} 
                  to={`/prerequisites/${encodeURIComponent(prereq)}`}
                  className="prereq-btn glass-panel"
                >
                  {prereq}
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No specific prerequisites required for this course.</p>
            </div>
          )}
        </div>

        <div className="actions">
          <Link to={`/note/${cleanName.toLowerCase().replace(/\s+/g, '-')}`} className="proceed-btn">
            <BookOpen size={20} />
            View Study Materials
          </Link>
        </div>
      </div>
    </div>
  );
}
