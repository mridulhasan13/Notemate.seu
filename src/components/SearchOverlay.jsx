import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courseData } from '../data/courses';
import { supabase } from '../utils/supabaseClient';
import NoteCard from './NoteCard';
import './SearchOverlay.css';

export default function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ courses: [], materials: [] });
    const [searching, setSearching] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            document.body.style.overflow = 'auto';
            setQuery('');
            setResults({ courses: [], materials: [] });
        }
    }, [isOpen]);

    // Search Logic
    useEffect(() => {
        if (!query.trim()) {
            setResults({ courses: [], materials: [] });
            return;
        }

        const timer = setTimeout(() => {
            performSearch(query.trim());
        }, 300); // Debounce

        return () => clearTimeout(timer);
    }, [query]);

    const performSearch = async (searchTerm) => {
        setSearching(true);
        const lowerTerm = searchTerm.toLowerCase();

        // 1. Static Curriculum Search
        const matchedCourses = [];
        const seenCourses = new Set();

        Object.entries(courseData).forEach(([dept, categories]) => {
            Object.values(categories).forEach(courseList => {
                if (Array.isArray(courseList)) {
                    courseList.forEach(courseStr => {
                        if (courseStr.toLowerCase().includes(lowerTerm) && !seenCourses.has(courseStr)) {
                            matchedCourses.push({
                                title: courseStr,
                                dept: dept
                            });
                            seenCourses.add(courseStr);
                        }
                    });
                }
            });
        });

        // 2. Database Search (Supabase)
        try {
            const { data, error } = await supabase
                .from('notes')
                .select('*')
                .or(`title.ilike.%${searchTerm}%, student_name.ilike.%${searchTerm}%, faculty_name.ilike.%${searchTerm}%, course_code.ilike.%${searchTerm}%`)
                .limit(10);

            if (error) throw error;

            setResults({
                courses: matchedCourses.slice(0, 8),
                materials: data || []
            });
        } catch (error) {
            console.error("Search Error:", error.message);
            setResults(prev => ({ ...prev, courses: matchedCourses.slice(0, 8) }));
        } finally {
            setSearching(false);
        }
    };

    const handleCourseClick = (courseTitle, dept) => {
        onClose();
        navigate(`/viewer?title=${encodeURIComponent(courseTitle)}&dept=${dept}`);
    };

    if (!isOpen) return null;

    return (
        <div className="search-overlay-wrapper animate-fade-in" onClick={onClose}>
            <div className="search-container glass-panel" onClick={e => e.stopPropagation()}>
                <div className="search-header">
                    <Search className="search-icon text-muted" size={24} />
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Search for courses, notes, teachers, or topics..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <button className="close-btn" onClick={onClose}>
                        <kbd>ESC</kbd>
                        <X size={20} />
                    </button>
                </div>

                <div className="search-body custom-scrollbar">
                    {!query.trim() ? (
                        <div className="search-empty-state">
                            <SparklesIcon />
                            <p>Type anything to search the NoteMate archive</p>
                        </div>
                    ) : searching ? (
                        <div className="search-loading">
                            <Loader2 size={32} className="animate-spin text-gradient" />
                            <p>Searching through databases...</p>
                        </div>
                    ) : (results.courses.length === 0 && results.materials.length === 0) ? (
                        <div className="search-no-results">
                            <p>No matches found for "<strong>{query}</strong>"</p>
                        </div>
                    ) : (
                        <div className="search-results">
                            {results.courses.length > 0 && (
                                <section className="results-section">
                                    <h3 className="section-label">Academic Courses</h3>
                                    <div className="courses-results-grid">
                                        {results.courses.map((course, idx) => (
                                            <div 
                                                key={idx} 
                                                className="search-course-item glass-panel"
                                                onClick={() => handleCourseClick(course.title, course.dept)}
                                            >
                                                <div className="course-info">
                                                    <span className="course-dept-tag">{course.dept}</span>
                                                    <span className="course-title-text">{course.title}</span>
                                                </div>
                                                <ArrowRight size={14} className="arrow-icon" />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {results.materials.length > 0 && (
                                <section className="results-section">
                                    <h3 className="section-label">Study Materials</h3>
                                    <div className="materials-results-grid">
                                        {results.materials.map(note => (
                                            <NoteCard 
                                                key={note.id}
                                                id={note.id}
                                                title={note.title}
                                                fileUrl={note.file_url}
                                                studentName={note.student_name}
                                                batch={note.batch}
                                                facultyName={note.faculty_name}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SparklesIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gradient" style={{ marginBottom: '1rem', opacity: 0.5 }}>
            <path d="M12 3L14.5 9L21 11.5L14.5 14L12 21L9.5 14L3 11.5L9.5 9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
