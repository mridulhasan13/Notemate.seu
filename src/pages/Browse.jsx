import { Book, Filter, ChevronRight } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import './Browse.css';

export default function Browse() {
    // Mock data
    const categories = ['Computer Science', 'Business', 'Biology', 'Economics', 'Engineering', 'Arts'];
    const notes = [
        { id: 1, title: 'Intro to Algorithms', course: 'CS 101', uploader: 'John M.', date: '3d ago', downloads: 41, rating: 4.8 },
        { id: 2, title: 'Marketing Principles', course: 'MKT 205', uploader: 'Sarah J.', date: '1w ago', downloads: 120, rating: 4.5 },
        { id: 3, title: 'Organic Chem Summary', course: 'CHM 302', uploader: 'Mike R.', date: '2w ago', downloads: 350, rating: 4.9 },
        { id: 4, title: 'Database Systems Notes', course: 'CS 340', uploader: 'Emily K.', date: '3d ago', downloads: 85, rating: 4.6 },
    ];

    return (
        <div className="browse-page container animate-fade-in">
            <div className="browse-header">
                <div>
                    <h1>Browse Notes</h1>
                    <p>Find the best study materials by department or semester.</p>
                </div>
                <button className="btn btn-secondary filter-btn">
                    <Filter size={18} /> Filters
                </button>
            </div>

            <div className="browse-layout">
                <aside className="sidebar">
                    <h3>Departments</h3>
                    <ul className="category-list">
                        {categories.map((cat) => (
                            <li key={cat} className="category-item">
                                <Book size={16} className="text-muted" />
                                <span>{cat}</span>
                                <ChevronRight size={14} className="chevron" />
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="browse-content">
                    <div className="browse-grid">
                        {notes.map(note => <NoteCard key={note.id} {...note} />)}
                    </div>
                </main>
            </div>
        </div>
    );
}
