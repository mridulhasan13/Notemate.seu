import React, { useState } from 'react';
import { UploadCloud, ChevronDown, Check, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { resourceTypes, courseData } from '../data/courses';
import { supabase } from '../utils/supabaseClient';
import './Upload.css';

export default function Upload() {
    // Form States
    const [userName, setUserName] = useState(localStorage.getItem('notemate_user_name') || '');
    const [studentId, setStudentId] = useState(localStorage.getItem('notemate_student_id') || '');
    
    // Auto-save user details for repeat contributions
    React.useEffect(() => {
        localStorage.setItem('notemate_user_name', userName);
        localStorage.setItem('notemate_student_id', studentId);
    }, [userName, studentId]);
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedType, setSelectedType] = useState('note');
    const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
    const [selectedCourseCode, setSelectedCourseCode] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = React.useRef(null);

    // UI States
    const [isDeptOpen, setIsDeptOpen] = useState(false);
    const [isBatchOpen, setIsBatchOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    const departments = ['CSE', 'EEE', 'TE', 'Arch', 'Economics', 'English', 'Bangla', 'BBA', 'Law', 'Pharmacy', 'ICT'];
    const batches = Array.from({ length: 20 }, (_, i) => (55 + i).toString());

    // Process courses to separate Code and Title
    const processedCourses = (selectedDept && courseData[selectedDept] && courseData[selectedDept][selectedType]) 
        ? courseData[selectedDept][selectedType].map(courseStr => {
            const match = courseStr.match(/^([A-Z0-9]+)\s+(.*)$/);
            if (match) {
                return { code: match[1], title: match[2], full: courseStr };
            }
            return { code: '', title: courseStr, full: courseStr };
        })
        : [];

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        if (!selectedDept || !selectedCourseCode || !selectedBatch) {
            alert('Please complete all dropdown selections (Department, Batch, Course).');
            return;
        }

        setUploadStatus('uploading');
        
        try {
            // 1. Upload file to Supabase Storage Bucket 'notes-bucket'
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${Math.random().toString(36).slice(2, 9)}_${Date.now()}.${fileExt}`;
            const filePath = `${selectedDept}/${selectedType}/${fileName}`;

            const { data: storageData, error: storageError } = await supabase.storage
                .from('notes-bucket')
                .upload(filePath, selectedFile);

            if (storageError) {
                throw new Error(`Storage upload failed: ${storageError.message}`);
            }

            const { data: { publicUrl } } = supabase.storage
                .from('notes-bucket')
                .getPublicUrl(filePath);

            // 3. (Optional) Final Formatted Filename: Note Title - Student Name (Batch) - Faculty Name
            const finalFormattedTitle = `${noteTitle} - ${userName} (${selectedBatch}) - ${facultyName}`;
            
            const { data, error } = await supabase
                .from('notes')
                .insert([
                    {
                        title: finalFormattedTitle,
                        course_code: selectedCourseCode,
                        course_name: selectedCourseTitle,
                        student_name: userName,
                        student_id: studentId,
                        batch: selectedBatch,
                        faculty_name: facultyName,
                        department: selectedDept,
                        resource_type: selectedType,
                        description: description,
                        file_url: publicUrl // New column
                    }
                ]);

            if (error) {
                throw error;
            }

            setUploadStatus('success');
            
            // Success reset
            setTimeout(() => {
                setUploadStatus(null);
                setNoteTitle('');
                setDescription('');
                setSelectedFile(null);
            }, 3000);
            
        } catch (error) {
            alert(`Upload failed: ${error.message}`);
            setUploadStatus('error');
            setTimeout(() => setUploadStatus(null), 5000);
        }
    };

    return (
        <div className="upload-page container animate-fade-in">
            <div className="upload-header text-center">
                <h1 className="text-gradient">Share Knowledge</h1>
                <p className="subtitle">Contribute to the Southeast University digital library.</p>
            </div>

            <div className="upload-form-container glass-panel">
                <form className="upload-form" onSubmit={handleUpload}>
                    {/* Integrated Dropzone into Form */}
                    <div className="dropzone" onClick={() => fileInputRef.current?.click()}>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={onFileChange} 
                            style={{ display: 'none' }} 
                        />
                        <div className="dropzone-content">
                            <UploadCloud size={48} className="text-gradient drop-icon" />
                            {selectedFile ? (
                                <div className="selected-file-info animate-fade-in">
                                    <h3 className="file-name text-gradient">{selectedFile.name}</h3>
                                    <p>File size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    <p className="text-primary mt-2" style={{ fontWeight: 600 }}>File ready. Click to change.</p>
                                </div>
                            ) : (
                                <>
                                    <h3>Drag & drop your files here</h3>
                                    <p>Supports PDF, DOCX, and image formats (Max 50MB)</p>
                                    <Button variant="secondary" className="mt-4" type="button">Browse Files</Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., John Doe" 
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Student ID</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., 202111000000" 
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group" style={{ position: 'relative' }}>
                                <label>Batch</label>
                                <div className="custom-select-container">
                                    <div 
                                        className={`custom-select-trigger ${isBatchOpen ? 'active' : ''}`} 
                                        onClick={() => setIsBatchOpen(!isBatchOpen)}
                                    >
                                        <span style={{ color: selectedBatch ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                            {selectedBatch ? `${selectedBatch} Batch` : 'Select Batch'}
                                        </span>
                                        <ChevronDown size={18} className="dropdown-arrow" />
                                    </div>
                                    {isBatchOpen && (
                                        <div className="custom-options">
                                            {batches.map((batch) => (
                                                <div 
                                                    key={batch} 
                                                    className={`custom-option ${selectedBatch === batch ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setSelectedBatch(batch);
                                                        setIsBatchOpen(false);
                                                    }}
                                                >
                                                    <span>{batch} Batch</span>
                                                    {selectedBatch === batch && <Check size={16} className="selection-check" />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group" style={{ position: 'relative' }}>
                                <label>Department</label>
                                <div className="custom-select-container">
                                    <div 
                                        className={`custom-select-trigger ${isDeptOpen ? 'active' : ''}`} 
                                        onClick={() => setIsDeptOpen(!isDeptOpen)}
                                    >
                                        <span style={{ color: selectedDept ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                            {selectedDept || 'Select department'}
                                        </span>
                                        <ChevronDown size={18} className="dropdown-arrow" />
                                    </div>
                                    {isDeptOpen && (
                                        <div className="custom-options">
                                            {departments.map((dept) => (
                                                <div 
                                                    key={dept} 
                                                    className={`custom-option ${selectedDept === dept ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setSelectedDept(dept);
                                                        setIsDeptOpen(false);
                                                        setSelectedCourseTitle('');
                                                        setSelectedCourseCode('');
                                                    }}
                                                >
                                                    <span>{dept}</span>
                                                    {selectedDept === dept && <Check size={16} className="selection-check" />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group" style={{ position: 'relative' }}>
                                <label>Resource Type</label>
                                <div className="custom-select-container">
                                    <div 
                                        className={`custom-select-trigger ${isTypeOpen ? 'active' : ''}`} 
                                        onClick={() => setIsTypeOpen(!isTypeOpen)}
                                    >
                                        <span style={{ color: 'var(--text-primary)' }}>
                                            {resourceTypes.find(t => t.id === selectedType)?.name || 'Select type'}
                                        </span>
                                        <ChevronDown size={18} className="dropdown-arrow" />
                                    </div>
                                    {isTypeOpen && (
                                        <div className="custom-options">
                                            {resourceTypes.map((type) => (
                                                <div 
                                                    key={type.id} 
                                                    className={`custom-option ${selectedType === type.id ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setSelectedType(type.id);
                                                        setIsTypeOpen(false);
                                                        setSelectedCourseTitle('');
                                                        setSelectedCourseCode('');
                                                    }}
                                                >
                                                    <span>{type.name}</span>
                                                    {selectedType === type.id && <Check size={16} className="selection-check" />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group" style={{ position: 'relative' }}>
                                <label>Course Name (Select to Auto-fill Code)</label>
                                <div className="custom-select-container">
                                    <div 
                                        className={`custom-select-trigger ${isCourseOpen ? 'active' : ''} ${!selectedDept ? 'disabled' : ''}`} 
                                        onClick={() => selectedDept && setIsCourseOpen(!isCourseOpen)}
                                    >
                                        <span style={{ color: selectedCourseTitle ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                            {selectedCourseTitle || (selectedDept ? 'Select course' : 'Select department first')}
                                        </span>
                                        <ChevronDown size={18} className="dropdown-arrow" />
                                    </div>
                                    {isCourseOpen && selectedDept && (
                                        <div className="custom-options">
                                            {processedCourses.length > 0 ? (
                                                processedCourses.map((course) => (
                                                    <div 
                                                        key={course.full} 
                                                        className={`custom-option ${selectedCourseTitle === course.title ? 'selected' : ''}`}
                                                        onClick={() => {
                                                            setSelectedCourseTitle(course.title);
                                                            setSelectedCourseCode(course.code);
                                                            setIsCourseOpen(false);
                                                        }}
                                                    >
                                                        <span>{course.title}</span>
                                                        {selectedCourseTitle === course.title && <Check size={16} className="selection-check" />}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="custom-option disabled">No courses found</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Course Code (Auto-filled)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., CS101" 
                                    value={selectedCourseCode}
                                    disabled
                                    className="disabled-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Faculty Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., Dr. Alan Turing" 
                                    value={facultyName}
                                    onChange={(e) => setFacultyName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Note Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g., Chapter 4: Neural Networks Summary" 
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (Optional)</label>
                            <textarea 
                                rows="3" 
                                placeholder="Briefly describe what these notes cover..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="form-actions">
                            <Button 
                                type="submit" 
                                variant="primary" 
                                className="w-full"
                                disabled={uploadStatus === 'uploading'}
                            >
                                {uploadStatus === 'uploading' ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin mr-2" />
                                        Uploading to Knowledge Base...
                                    </>
                                ) : uploadStatus === 'success' ? (
                                    '✓ Uploaded Successfully'
                                ) : (
                                    'Upload to Knowledge Base'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
