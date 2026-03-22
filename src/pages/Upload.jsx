import { UploadCloud, FileType, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import './Upload.css';

export default function Upload() {
    return (
        <div className="upload-page container animate-fade-in">
            <div className="upload-header text-center">
                <h1>Share Your Notes</h1>
                <p>Help your peers by uploading your best lecture notes and study guides to our open-source <a href="https://github.com/mridulhasan13/Notemate.seu" target="_blank" rel="noreferrer" className="text-gradient">Notemate.seu</a> repository.</p>
            </div>

            <div className="upload-form-container glass-panel">
                <div className="dropzone">
                    <div className="dropzone-content">
                        <UploadCloud size={48} className="text-gradient drop-icon" />
                        <h3>Drag & drop your files here</h3>
                        <p>Supports PDF, DOCX, and image formats (Max 50MB)</p>
                        <Button variant="secondary" className="mt-4">Browse Files</Button>
                    </div>
                </div>

                <form className="upload-details">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" placeholder="e.g., John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Student ID</label>
                            <input type="text" placeholder="e.g., 20210000" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Batch</label>
                            <input type="text" placeholder="e.g., 21st Batch" />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <select defaultValue="">
                                <option value="" disabled>Select department</option>
                                <option>Computer Science</option>
                                <option>Business</option>
                                <option>Biology</option>
                                <option>Economics</option>
                                <option>Engineering</option>
                                <option>Arts</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Course Name</label>
                            <input type="text" placeholder="e.g., Intro to Algorithms" />
                        </div>
                        <div className="form-group">
                            <label>Course Code</label>
                            <input type="text" placeholder="e.g., CS 101" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Faculty Name</label>
                        <input type="text" placeholder="e.g., Dr. Alan Turing" />
                    </div>
                    <div className="form-group">
                        <label>Note Title</label>
                        <input type="text" placeholder="e.g., Chapter 4: Neural Networks Summary" />
                    </div>


                    <div className="form-group">
                        <label>Description</label>
                        <textarea rows="4" placeholder="Briefly describe what these notes cover..."></textarea>
                    </div>

                    <div className="form-actions">
                        <Button variant="primary" className="w-full">Upload to Knowledge Base</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
