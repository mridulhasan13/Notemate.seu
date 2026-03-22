import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import Button from '../components/Button';
import './Home.css';

export default function Home() {
  const recentNotes = [
    { id: 1, title: 'Microeconomics Midterm Prep', course: 'ECON 101', uploader: 'Sarah J.', date: '2d ago', downloads: 142, rating: 4.9 },
    { id: 2, title: 'Data Structures Compendium', course: 'CS 202', uploader: 'Alex M.', date: '5d ago', downloads: 320, rating: 5.0 },
    { id: 3, title: 'Cell Biology Notes Chapter 4-6', course: 'BIO 110', uploader: 'Jessica T.', date: '1w ago', downloads: 89, rating: 4.7 },
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-badge delay-100">
          <Sparkles size={16} className="text-gradient" />
          <span>The Ultimate University Knowledge Base</span>
        </div>
        <h1 className="hero-title delay-200">
          A smarter way to <br/>
          <span className="text-gradient">study and share.</span>
        </h1>
        <p className="hero-subtitle delay-300">
          Access thousands of high-quality lecture notes, study guides, and past exams uploaded by top students.
        </p>
        
        <div className="search-container delay-400">
          <div className="search-bar glass-panel">
            <Search className="search-icon" size={24} />
            <input 
              type="text" 
              placeholder="Search for courses, professors, or subjects..." 
              className="search-input"
            />
            <Button variant="primary" className="search-btn">Search</Button>
          </div>
        </div>

        <div className="hero-actions delay-400">
          <Link to="/browse">
            <Button variant="secondary">Browse Categories</Button>
          </Link>
          <Link to="/upload">
            <Button variant="primary">
              Upload Notes <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Popular Notes */}
      <section className="popular-section container delay-400">
        <div className="section-header">
          <h2>Trending Notes</h2>
          <Link to="/browse" className="view-all-link">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="notes-grid">
          {recentNotes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      </section>
    </div>
  );
}
