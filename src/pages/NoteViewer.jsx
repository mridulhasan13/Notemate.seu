import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronLeft, FileText, Loader2, BookOpen, ArrowRight } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import NoteCard from '../components/NoteCard';
import './NoteViewer.css';

export default function NoteViewer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fullTitle = queryParams.get('title') || "Study Materials";
    const dept = queryParams.get('dept') || "";
    const type = queryParams.get('type') || "note";

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseHeader, setCourseHeader] = useState({ title: '', code: '', dept: '' });

    // Extract current URL info
    const codeMatch = fullTitle.match(/^([A-Z0-9]+)\s/);
    const currentCode = codeMatch ? codeMatch[1] : 'N/A';
    const currentTitle = fullTitle.replace(/^[A-Z0-9]+\s/, '').replace(' All notes', '');

    // Safety Lock: Only update header if it's a valid course (has a code)
    useEffect(() => {
        if (currentCode !== 'N/A') {
            setCourseHeader({
                title: currentTitle,
                code: currentCode,
                dept: dept
            });
            fetchCourseNotes(currentCode);
        }
    }, [fullTitle, dept]);

    const fetchCourseNotes = async (targetCode) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('notes')
                .select('*')
                .eq('course_code', targetCode)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNotes(data || []);
        } catch (error) {
            console.error('Error fetching course notes:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="viewer-page animate-fade-in">
            {/* Professional Identity Header */}
            <header className="identity-header">
                <div className="container header-content">
                    <button onClick={() => navigate(-1)} className="professional-back-btn">
                        <ChevronLeft size={18} />
                        <span>Library</span>
                    </button>
                    
                    <div className="identity-info text-center">
                        <div className="identity-pre-label">{courseHeader.dept ? `${courseHeader.dept} Department` : 'Academic Curriculum'}</div>
                        <h1 className="identity-title">{courseHeader.title || currentTitle}</h1>
                        <div className="identity-meta-row">
                            <span className="meta-item">
                                <span className="meta-label">CODE:</span> {courseHeader.code || currentCode}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="empty-content-area">
                <div className="container">
                    {/* Placeholder for future notes or just empty space as per user request to "remove the page" */}
                </div>
            </div>

            <div className="viewer-content">
                <div className="section-container">
                    <h2 className="section-title">
                        <FileText size={20} className="text-gradient" /> 
                        Materials for this Course
                    </h2>
                    
                    {loading ? (
                        <div className="loading-state glass-panel">
                            <Loader2 size={32} className="animate-spin text-gradient" />
                            <p>Loading course materials...</p>
                        </div>
                    ) : notes.length > 0 ? (
                        <div className="notes-grid">
                            {notes.map(note => (
                                <NoteCard 
                                    key={note.id} 
                                    id={note.id} 
                                    title={note.title} 
                                    dept={dept}
                                    fileUrl={note.file_url}
                                    studentName={note.student_name}
                                    batch={note.batch}
                                    facultyName={note.faculty_name}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state glass-panel animate-fade-in">
                            <div className="empty-icon-box" style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                                <BookOpen size={48} className="text-gradient" />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Materials Found</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Be the first student to contribute! Your upload will help the entire community.</p>
                            <Link to="/upload" className="action-icon-btn nav-btn" style={{ 
                                width: 'auto', 
                                padding: '0 2.5rem', 
                                height: '48px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                fontSize: '0.85rem',
                                fontWeight: '800',
                                borderRadius: '14px',
                                gap: '0.75rem',
                                margin: '0 auto'
                            }}>
                                CONTRIBUTE NOW <ArrowRight size={18} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
