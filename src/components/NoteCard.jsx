import { Link } from 'react-router-dom';
import { Download, FileText, Eye, Printer, BookOpen, ArrowRight } from 'lucide-react';
import './NoteCard.css';

export default function NoteCard({ id, title, dept, fileUrl, studentName: propStudentName, batch: propBatch, facultyName: propFacultyName }) {
    // Universal Metadata Extraction Engine
    let cleanTitle = title;
    let studentName = propStudentName || '';
    let studentBatch = propBatch || '';
    let facultyName = propFacultyName || '';
    let isFile = !!fileUrl;

    // 1. Title Cleaning Logic (Independent of Metadata Props)
    if (isFile) {
        // If it follows the standard "Title - Name (Batch) - Faculty" format
        const titleParts = title.split(' - ');
        if (titleParts.length >= 2) {
            cleanTitle = titleParts[0];
        }
        
        // 2. Extra Metadata Extraction (Fallback if props are missing)
        if (!studentName && !studentBatch && !facultyName) {
            const contribMatch = title.match(/^(.*)\s-\s(.*)\s\((.*)\)\s-\s(.*)$/);
            if (contribMatch) {
                studentName = contribMatch[2];
                studentBatch = contribMatch[3];
                facultyName = contribMatch[4];
            }
        }
    } else {
        // 3. Navigation cards for Curriculum: "ACT141 Course Title"
        const currMatch = title.match(/^([A-Z0-9]+)\s+(.*)/);
        if (currMatch) {
            cleanTitle = currMatch[2];
        }
    }

    const handleAction = async (e, type) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (type === 'view') {
            window.open(fileUrl, '_blank');
            return;
        }

        try {
            // Fetch file as blob for native device handling (CORS-friendly)
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const extension = fileUrl.split('.').pop() || 'pdf';

            if (type === 'download') {
                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', `${cleanTitle}.${extension}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
            } else if (type === 'print') {
                const printWindow = window.open(blobUrl, '_blank');
                if (printWindow) {
                    printWindow.onload = () => {
                        printWindow.print();
                    };
                }
            }
        } catch (err) {
            console.error("Native action failed:", err);
            window.open(fileUrl, '_blank');
        }
    };

    const CardContent = (
        <div className="card-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', width: '100%', height: '100%', justifyContent: 'center' }}>
            {isFile && (
                <div className="file-icon-box" style={{ marginBottom: '0.1rem' }}>
                    <FileText size={18} />
                </div>
            )}
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <h3 className="note-title">{cleanTitle}</h3>
                {studentName && (
                    <div className="student-badge" style={{ textTransform: 'uppercase' }}>
                        <span>{studentName}</span>
                        {studentBatch && <span className="batch-dot">●</span>}
                        {studentBatch && <span>BATCH {studentBatch}</span>}
                        {facultyName && <span className="batch-dot">●</span>}
                        {facultyName && <span>{facultyName}</span>}
                    </div>
                )}
            </div>
            
            {isFile && (
                <>
                    <div className="card-separator" style={{ width: '80%', height: '1px', background: 'rgba(255, 255, 255, 0.05)', margin: '0.8rem 0' }}></div>
                    <div className="actions-row" style={{ justifyContent: 'center', width: '100%', gap: '0.8rem' }}>
                        <button onClick={(e) => handleAction(e, 'view')} className="action-icon-btn" title="View">
                            <Eye size={14} />
                        </button>
                        <button onClick={(e) => handleAction(e, 'download')} className="action-icon-btn" title="Download">
                            <Download size={14} />
                        </button>
                        <button onClick={(e) => handleAction(e, 'print')} className="action-icon-btn" title="Print">
                            <Printer size={14} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );

    if (fileUrl) {
        return (
            <div className="note-card-container">
                <div className="note-card file-card" onClick={(e) => handleAction(e, 'view')} title="View Note">
                    {CardContent}
                </div>
            </div>
        );
    }

    return (
        <div className="note-card-container">
            <Link to={`/viewer?title=${encodeURIComponent(title)}&dept=${dept || ''}`} className="note-card">
                {CardContent}
            </Link>
        </div>
    );
}
