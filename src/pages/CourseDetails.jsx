import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen } from 'lucide-react';
import './CourseDetails.css';

export default function CourseDetails() {
  const { courseId, courseTitle } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(courseTitle);
  
  // Extract code from title (Format: "CSE141 Title")
  const codeMatch = decodedTitle.match(/^([A-Z0-9]+)\s/);
  const courseCode = codeMatch ? codeMatch[1] : 'N/A';
  const displayTitle = decodedTitle.replace(/^[A-Z0-9]+\s/, '').replace(' All notes', '');

  return (
    <div className="details-page container animate-fade-in">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="details-container glass-panel minimalist">
        <div className="content-wrapper">
          <div className="identity-section">
            <h1 className="course-code text-gradient">{courseCode}</h1>
            <h2 className="course-title">{displayTitle}</h2>
          </div>

          <div className="actions">
            <button 
              onClick={() => navigate(`/note/${courseId}`)} 
              className="proceed-btn-minimal"
            >
              <BookOpen size={18} />
              Access Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
