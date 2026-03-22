import { Download, Star, Clock } from 'lucide-react';
import './NoteCard.css';

export default function NoteCard({ title, course, uploader, date, downloads, rating }) {
  return (
    <div className="note-card glass-panel">
      <div className="note-card-header">
        <span className="course-badge">{course}</span>
        <div className="rating">
          <Star size={14} className="star-icon" fill="currentColor" />
          <span>{rating}</span>
        </div>
      </div>
      <h3 className="note-title">{title}</h3>
      <p className="note-uploader">by {uploader}</p>
      
      <div className="note-card-footer">
        <div className="note-stats">
          <span className="stat"><Clock size={14}/> {date}</span>
          <span className="stat"><Download size={14}/> {downloads}</span>
        </div>
        <button className="download-btn"><Download size={16}/></button>
      </div>
    </div>
  );
}
