import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, Loader2, BookOpen, FileText } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import { supabase } from '../utils/supabaseClient';
import { courseData } from '../data/courses';
import './Browse.css';

export default function Browse() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedType = queryParams.get('type') || 'note';
    const selectedDept = queryParams.get('department') || 'CSE';

    // Get static curriculum for this dept/type
    const curriculum = (courseData[selectedDept] && courseData[selectedDept][selectedType]) || [];

    return (
        <div className="browse-page container animate-fade-in">
            <div className="browse-header">
                <div>
                    <h1>{selectedDept} {selectedType.charAt(0).toUpperCase() + selectedType.slice(1).replace('-', ' ')}s</h1>
                    <p>Official Curriculum & Student Resources</p>
                </div>
            </div>

            <div className="browse-content">
                {/* Official Curriculum Directory (Always visible) */}
                <div className="section-container">
                    <h2 className="section-title"><BookOpen size={20} className="text-gradient" /> {selectedDept} Curriculum Directory</h2>
                    <div className="browse-grid">
                        {curriculum.length > 0 ? (
                            curriculum.map((course, index) => (
                                <NoteCard 
                                    key={`curriculum-${index}`} 
                                    id={`curriculum-${index}`} 
                                    title={course} 
                                    isPlaceholder={true} // New prop for visual differentiation
                                    dept={selectedDept}
                                />
                            ))
                        ) : (
                            <div className="no-results glass-panel w-full">
                                <h3>No Curriculum Found</h3>
                                <p>Check back later for updates to the {selectedDept} catalog.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
