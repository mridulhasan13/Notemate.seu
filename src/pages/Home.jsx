import { ArrowRight, Search, Sparkles, FileText, FlaskConical, ClipboardList, Presentation, HelpCircle, BookOpen, Upload, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import Button from '../components/Button';
import './Home.css';

export default function Home() {
  const categories = [
    { name: 'Note', icon: FileText, path: '/browse?type=note' },
    { name: 'Lab Report', icon: FlaskConical, path: '/browse?type=lab' },
    { name: 'Assignment', icon: ClipboardList, path: '/browse?type=assignment' },
    { name: 'Presentation', icon: Presentation, path: '/browse?type=presentation' },
    { name: 'Question Bank', icon: HelpCircle, path: '/browse?type=question-bank' },
    { name: 'Syllabus', icon: BookOpen, path: '/browse?type=syllabus' },
    { name: 'Submit Note', icon: Upload, path: '/upload' },
    { name: 'Credit plan', icon: Award, path: '/credit-plan' },
    { name: 'Teachers information', icon: Users, path: '/teachers' },
  ];

  const recentNotes = [
    { id: 1, title: 'Microeconomics Midterm Prep', course: 'ECON 101', uploader: 'Sarah J.', date: '2d ago', downloads: 142, rating: 4.9 },
    { id: 2, title: 'Data Structures Compendium', course: 'CS 202', uploader: 'Alex M.', date: '5d ago', downloads: 320, rating: 5.0 },
    { id: 3, title: 'Cell Biology Notes Chapter 4-6', course: 'BIO 110', uploader: 'Jessica T.', date: '1w ago', downloads: 89, rating: 4.7 },
  ];

  return (
    <div className="home-page animate-fade-in" style={{ paddingTop: '4rem' }}>
      <section className="container">
        <h1 className="hero-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Explore <span className="text-gradient">Resources</span>
        </h1>
        
        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link to={category.path} key={category.name} className="category-pill glass-panel" style={{ minWidth: '220px', padding: '1.5rem', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                <Icon size={32} className="category-icon" />
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{category.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Notes */}
      <section className="popular-section container delay-400" style={{ marginTop: '5rem' }}>
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
