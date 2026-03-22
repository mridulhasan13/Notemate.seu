import { Download, Bot, Star, MessageSquare } from 'lucide-react';
import Button from '../components/Button';
import './NoteViewer.css';

export default function NoteViewer() {
    return (
        <div className="viewer-page container animate-fade-in">
            <div className="viewer-header">
                <div>
                    <span className="course-tag">CS 202</span>
                    <h1>Data Structures Compendium</h1>
                    <p className="meta">Uploaded by Alex M. • 5 days ago • 320 downloads</p>
                </div>
                <div className="viewer-actions">
                    <Button variant="secondary"><Star size={18}/> Save</Button>
                    <Button variant="primary"><Download size={18}/> Download PDF</Button>
                </div>
            </div>

            <div className="viewer-layout">
                <div className="document-container glass-panel">
                    {/* Mock PDF Viewer */}
                    <div className="pdf-mock">
                        <div className="pdf-page">
                            <h2>1. Trees and Graphs</h2>
                            <p>A tree is a widely used abstract data type that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node...</p>
                            <br/><br/>
                            <div className="mock-diagram">Graph Diagram Placeholder</div>
                            <br/><br/>
                            <p>Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures...</p>
                        </div>
                    </div>
                </div>

                <aside className="ai-assistant glass-panel">
                    <div className="ai-header">
                        <Bot className="text-gradient" size={24} />
                        <h3>NoteMate AI</h3>
                    </div>
                    
                    <div className="ai-chat">
                        <div className="chat-bubble ai">
                            Hello! I've read this document. You can ask me to summarize concepts or explain specific terms from this note.
                        </div>
                        <div className="chat-bubble user">
                            Can you explain what DFS is based on these notes?
                        </div>
                        <div className="chat-bubble ai typing">
                            <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                        </div>
                    </div>

                    <div className="ai-input">
                        <input type="text" placeholder="Ask NoteMate..." />
                        <button className="send-btn"><MessageSquare size={16}/></button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
