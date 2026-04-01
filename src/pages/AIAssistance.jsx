import React, { useState, useRef, useEffect } from 'react';
import {
    Bot, Send, Sparkles, FileText, Target, HelpCircle,
    Copy, Check, Loader2, AlertCircle, AlertTriangle, Paperclip, X,
    Search, BookOpen, Image, File, Database, ChevronDown
} from 'lucide-react';
import { askAI, analyzeNoteFromUrl, summarizeNote, getExamTopics, predictQuestions } from '../utils/gemini';
import { supabase } from '../utils/supabaseClient';
import { courseData } from '../data/courses';
import './AIAssistance.css';

const TABS = [
    { id: 'chat',      label: 'AI Chat',          icon: Bot,        desc: 'Chat with AI — attach any file or load a note from the platform' },
    { id: 'summarize', label: 'Summarize',         icon: FileText,   desc: 'Paste notes → get a clean bullet-point summary' },
    { id: 'topics',    label: 'Exam Topics',        icon: Target,     desc: 'Find the most important topics likely to appear in exams' },
    { id: 'predict',   label: 'Predict Questions', icon: HelpCircle, desc: 'Predict short, broad, and MCQ questions for your exam' },
];

const SUBJECTS = ['', 'CSE', 'EEE', 'Mathematics', 'Physics', 'English', 'Pharmacy', 'BBA', 'Law', 'Economics', 'Architecture', 'Textile Engineering', 'Bangla'];
const ACCEPT_TYPES = '.pdf,.png,.jpg,.jpeg,.webp,.txt';

const QUICK_ACTIONS = [
    { id: 'summary',  label: 'Summarize Note',   icon: FileText,   text: 'Analyze my attached note and give me a clear, bulleted summary.' },
    { id: 'predict',  label: 'Predict Questions', icon: HelpCircle, text: 'Based on these notes, what are the most likely questions for my upcoming exam?' },
    { id: 'topics',   label: 'Find Exam Topics',  icon: Target,     text: 'Extract the most important topics from this material for exam preparation.' },
    { id: 'study',    label: 'Study Plan',        icon: BookOpen,   text: 'Create a 3-day intense study plan based on this content.' }
];

import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked to use standard formatting
marked.setOptions({ breaks: true, gfm: true });

// ── Markdown renderer ──────────────────────────────────────────────────────────
function renderMarkdown(text) {
    if (!text) return '';
    try {
        return DOMPurify.sanitize(marked.parse(text));
    } catch(e) { return text; }
}

// ── Copy Button ────────────────────────────────────────────────────────────────
function CopyBtn({ text }) {
    const [copied, setCopied] = useState(false);
    return (
        <button className="copy-btn" onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
            {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
        </button>
    );
}

// ── AI Response block ──────────────────────────────────────────────────────────
const formatAIResponse = (text) => {
    if (!text) return '';
    return text
        .replace(/### (.*)\n/g, '<h3>$1</h3>')
        .replace(/## (.*)\n/g, '<h2>$1</h2>')
        .replace(/# (.*)\n/g, '<h1>$1</h1>')
        .replace(/\*\* (.*) \*\*/g, '<strong>$1</strong>')
        .replace(/\* (.*)\n/g, '<li>$1</li>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');
};

function AIResponse({ text, isStreaming }) {
    return (
        <div className="ai-response fade-in">
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: formatAIResponse(text) }} />
            {isStreaming && <div className="streaming-cursor" />}
        </div>
    );
}

// ── API Key warning ────────────────────────────────────────────────────────────
function ApiKeyWarning() {
    return (
        <div className="api-key-warning">
            <AlertCircle size={20} />
            <div>
                <strong>Gemini API Key Required</strong>
                <p>Add <code>VITE_GEMINI_API_KEY=your_key</code> to your <code>.env</code> and restart. Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">aistudio.google.com</a></p>
            </div>
        </div>
    );
}

// ── Platform Notes Browser (loads from Supabase) ───────────────────────────────
function NotesBrowser({ onNoteSelect, onClose }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const departments = Object.keys(courseData);
    
    // Process courses based on selected department
    const availableCourses = selectedDept && courseData[selectedDept] 
        ? [...new Set([
            ...(courseData[selectedDept].note || []),
            ...(courseData[selectedDept]['lab-report'] || []),
            ...(courseData[selectedDept].assignment || []),
            ...(courseData[selectedDept].presentation || []),
            ...(courseData[selectedDept]['question-bank'] || []),
            ...(courseData[selectedDept].syllabus || [])
        ])].map(courseStr => {
            const match = courseStr.match(/^([A-Z0-9]+)\s+(.*)$/);
            return match ? { code: match[1], title: match[2], full: courseStr } : { code: '', title: courseStr, full: courseStr };
        })
        : [];

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('notes')
                .select('id, title, course_code, file_url, student_name, mime_type')
                .order('created_at', { ascending: false });
            if (!error) setNotes(data || []);
            setLoading(false);
        };
        fetchNotes();
    }, []);

    const filtered = notes.filter(n => {
        const matchesSearch = (n.title || '').toLowerCase().includes(search.toLowerCase()) || 
                              (n.course_code || '').toLowerCase().includes(search.toLowerCase());
        const matchesDept = selectedDept 
            ? availableCourses.some(c => (n.course_code || '').startsWith(c.code) || c.full === n.course_code) 
            : true;
        const matchesCourse = selectedCourse ? (n.course_code || '').startsWith(selectedCourse) : true;
        return matchesSearch && matchesDept && matchesCourse;
    });

    return (
        <div className="notes-browser">
            <div className="notes-browser-header">
                <Database size={15} />
                <span>Platform Notes</span>
                <button onClick={onClose} className="close-notes-btn"><X size={14} /></button>
            </div>

            <>
                <div className="notes-search-box">
                    <Search size={13} />
                    <input
                        placeholder="Search notes..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                    <div className="notes-filter-row">
                        <select 
                            value={selectedDept} 
                            onChange={e => { setSelectedDept(e.target.value); setSelectedCourse(''); }}
                            className="notes-select"
                        >
                            <option value="">All Departments</option>
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        
                        <select 
                            value={selectedCourse} 
                            onChange={e => setSelectedCourse(e.target.value)}
                            className="notes-select"
                            disabled={!selectedDept}
                        >
                            <option value="">All Courses</option>
                            {availableCourses.map(c => <option key={c.full} value={c.code}>{c.code} - {c.title}</option>)}
                        </select>
                    </div>
                    {loading && <div className="notes-loading"><Loader2 size={16} className="spin" /> Loading...</div>}
                    <div className="notes-list">
                        {filtered.map(note => (
                            <button key={note.id} className="note-item" onClick={() => onNoteSelect(note)} title={note.title}>
                                <BookOpen size={13} />
                                <span className="note-item-title">{note.title || 'Untitled'}</span>
                                <span className="note-item-code">{note.course_code}</span>
                            </button>
                        ))}
                        {!loading && filtered.length === 0 && <p className="notes-empty">No notes found</p>}
                    </div>
                </>
        </div>
    );
}

// ── File Attachment Badge ──────────────────────────────────────────────────────
function AttachmentBadge({ file, note, onRemove }) {
    const name = file ? file.name : note?.title || 'Note';
    const icon = file
        ? (file.type.startsWith('image/') ? <Image size={13} /> : <File size={13} />)
        : <BookOpen size={13} />;
    return (
        <div className="attachment-badge">
            {icon}
            <span>{name.length > 28 ? name.substring(0, 25) + '…' : name}</span>
            <button onClick={onRemove}><X size={12} /></button>
        </div>
    );
}

// ── Chat Tab ──────────────────────────────────────────────────────────────────
function ChatTab() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [attachedFile, setAttachedFile] = useState(null);
    const [attachedNote, setAttachedNote] = useState(null);
    const [showNotes, setShowNotes] = useState(false);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => { 
        if (messages.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); 
        }
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        if (f) { setAttachedFile(f); setAttachedNote(null); }
    };

    const handleNoteSelect = (note) => {
        setAttachedNote(note);
        setAttachedFile(null);
        setShowNotes(false);
        if (!input.trim()) {
            setInput(`Please analyze this note and: 1) Summarize the key points, 2) Identify important exam topics, 3) Predict likely exam questions.`);
        }
    };

    const clearAttachment = () => { setAttachedFile(null); setAttachedNote(null); if (fileInputRef.current) fileInputRef.current.value = ''; };

    const handleSend = async () => {
        if ((!input.trim() && !attachedFile && !attachedNote) || loading) return;
        const userMsg = input.trim() || 'Analyze this file.';
        setInput('');
        const displayMsg = attachedFile
            ? `📎 ${attachedFile.name}\n\n${userMsg}`
            : attachedNote
                ? `📄 [${attachedNote.course_code}] ${attachedNote.title}\n\n${userMsg}`
                : userMsg;

        setMessages(prev => [...prev, { role: 'user', text: displayMsg }]);
        setLoading(true);

        const fileToSend = attachedFile;
        const noteToSend = attachedNote;
        clearAttachment();

        try {
            let stream;
            if (noteToSend?.file_url) {
                const mimeType = noteToSend.file_url.toLowerCase().match(/\.(png|jpg|jpeg|webp)$/) ? `image/${RegExp.$1}` : 'application/pdf';
                stream = await analyzeNoteFromUrl(noteToSend.file_url, userMsg, mimeType);
            } else {
                const history = messages.slice(1).map(m => ({ role: m.role, text: m.text }));
                stream = await askAI(userMsg, history, fileToSend);
            }

            let full = '';
            setMessages(prev => [...prev, { role: 'model', text: '', streaming: true }]);
            for await (const chunk of stream) {
                full += chunk.text();
                setMessages(prev => { const u = [...prev]; u[u.length - 1] = { role: 'model', text: full, streaming: true }; return u; });
            }
            setMessages(prev => { const u = [...prev]; u[u.length - 1] = { role: 'model', text: full, streaming: false }; return u; });
        } catch (e) {
            console.error('Gemini API Error:', e);
            if (e.message === 'GEMINI_API_KEY_MISSING') setApiError(true);
            else setMessages(prev => [...prev, { role: 'model', text: `❌ Error processing your request: **${e.message || 'Unknown error'}**` }]);
        }
        setLoading(false);
    };

    if (apiError) return <ApiKeyWarning />;

    return (
        <div className="chat-wrapper">
            <div className="chat-main">
                <div className="chat-messages">
                    {messages.length === 0 && (
                        <div className="empty-chat-hero">
                            <div className="hero-branding">
                                <div className="hero-logo"><Sparkles size={32} /></div>
                                <h2>How can I help you study today?</h2>
                                <p>Upload a file, select a platform note, or choose a quick action below to get started.</p>
                            </div>
                            <div className="quick-actions-grid">
                                {QUICK_ACTIONS.map(action => (
                                    <button 
                                        key={action.id} 
                                        className="quick-action-card" 
                                        onClick={() => { setInput(action.text); textareaRef.current?.focus(); }}
                                    >
                                        <div className="action-icon"><action.icon size={20} /></div>
                                        <div className="action-label">{action.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {messages.map((m, i) => (
                        m.role === 'user'
                            ? <div key={i} className="user-message"><span dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, '<br/>') }} /></div>
                            : <AIResponse key={i} text={m.text} isStreaming={m.streaming} />
                    ))}
                    {loading && messages[messages.length - 1]?.role === 'user' && (
                        <div className="ai-response-block">
                            <div className="ai-response-header"><div className="ai-avatar"><Bot size={15} /></div><span className="ai-label">NoteMate AI</span></div>
                            <div className="thinking-dots"><span /><span /><span /></div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Input area */}
                <div className="chat-input-area">
                    {(attachedFile || attachedNote) && (
                        <div className="attachment-preview">
                            <AttachmentBadge file={attachedFile} note={attachedNote} onRemove={clearAttachment} />
                        </div>
                    )}
                    <div className="chat-input-bar">
                        <input type="file" ref={fileInputRef} accept={ACCEPT_TYPES} onChange={handleFileChange} style={{ display: 'none' }} />
                        <button className="icon-btn" onClick={() => fileInputRef.current?.click()} title="Attach file (PDF, image)">
                            <Paperclip size={18} />
                        </button>
                        <button className={`icon-btn ${showNotes ? 'active' : ''}`} onClick={() => setShowNotes(p => !p)} title="Browse platform notes">
                            <Database size={18} />
                        </button>
                        <textarea
                            ref={textareaRef}
                            className="chat-textarea"
                            placeholder="Ask anything, or attach a file / load a note..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                            rows={1}
                        />
                        <button className="send-btn" onClick={handleSend} disabled={loading || (!input.trim() && !attachedFile && !attachedNote)}>
                            {loading ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Notes browser panel */}
            {showNotes && (
                <div className="notes-panel">
                    <NotesBrowser onNoteSelect={handleNoteSelect} onClose={() => setShowNotes(false)} />
                </div>
            )}
        </div>
    );
}

// ── Tool Tab ──────────────────────────────────────────────────────────────────
const ToolTab = ({ title, placeholder, buttonLabel, icon: Icon, fn, intent }) => {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNotes, setShowNotes] = useState(false);

    const handleRun = async () => {
        if (!text.trim() || loading) return;
        setLoading(true);
        try {
            const stream = await fn(text);
            let full = '';
            for await (const chunk of stream) full += chunk.text();
            setResult(full);
        } catch (err) {
            setResult("Error processing request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNoteSelect = async (note) => {
        setLoading(true);
        setResult('');
        setShowNotes(false);
        try {
            const detectMime = (url) => {
                if (note.mime_type) return note.mime_type;
                const ext = (url || '').split('.').pop().toLowerCase();
                if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return `image/${ext === 'jpg' ? 'jpeg' : ext}`;
                return 'application/pdf';
            };
            const stream = await analyzeNoteFromUrl(note.file_url, `Based on this note, please provide a ${intent.toLowerCase()}.`, detectMime(note.file_url));
            let full = '';
            for await (const chunk of stream) full += chunk.text();
            setResult(full);
        } catch (err) {
            setResult("Error analyzing the note. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-layout">
            <div className={`tool-main-content ${showNotes ? 'with-notes' : ''}`}>
                <div className="tool-header">
                    <div className="tool-icon-circle"><Icon size={24} /></div>
                    <h3>{title}</h3>
                    <button 
                        className={`icon-btn database-toggle ${showNotes ? 'active' : ''}`} 
                        onClick={() => setShowNotes(p => !p)}
                        title="Browse platform notes"
                    >
                        <Database size={18} />
                    </button>
                </div>
                
                <div className="tool-body">
                    <div className="tool-input-section">
                        <textarea 
                            placeholder={placeholder}
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <button className="run-btn" onClick={handleRun} disabled={loading || !text.trim()}>
                            {loading ? <Loader2 size={18} className="spin" /> : <><Icon size={18} /> {buttonLabel}</>}
                        </button>
                    </div>

                    {result && (
                        <div className="tool-result-section fade-in">
                            <div className="result-header">
                                <span>Analysis Result</span>
                            </div>
                            <div className="result-content markdown-body" dangerouslySetInnerHTML={{ __html: formatAIResponse(result) }} />
                        </div>
                    )}
                </div>
            </div>

            {showNotes && (
                <div className="tool-notes-panel">
                    <NotesBrowser onNoteSelect={handleNoteSelect} onClose={() => setShowNotes(false)} />
                </div>
            )}
        </div>
    );
};

const PredictTab = () => {
    return <ToolTab 
        title="Paste or Load a Note" 
        placeholder="Paste your study material or load from data..." 
        buttonLabel="Predict Questions" 
        icon={AlertTriangle} 
        fn={predictQuestions} 
        intent="List of Predicted Exam Questions"
    />;
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AIAssistance() {
    const [activeTab, setActiveTab] = useState('chat');

    return (
        <div className="ai-page animate-fade-in">
            <div className="ai-header">
                <div className="ai-header-icon"><Sparkles size={26} /></div>
                <div>
                    <h1>AI Study <span className="text-gradient">Assistant</span></h1>
                    <p className="ai-subtitle">Powered by Google Gemini · Chat, upload files, or analyze platform notes</p>
                </div>
            </div>

            <div className="ai-tabs">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button key={tab.id} className={`ai-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                            <Icon size={15} /><span className="tab-label">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
            <div className="ai-tab-desc">{TABS.find(t => t.id === activeTab)?.desc}</div>

            <div className={`ai-content glass-panel ${activeTab === 'chat' ? 'ai-content-chat' : ''}`}>
                {activeTab === 'chat'      && <ChatTab />}
                {activeTab === 'summarize' && <ToolTab title="Paste or Load a Note" placeholder="Paste any lecture notes or load from data..." buttonLabel="Summarize Notes" icon={FileText} fn={summarizeNote} intent="Detailed Summary" />}
                {activeTab === 'topics'    && <ToolTab title="Paste or Load a Note" placeholder="Paste your notes or load from data..." buttonLabel="Find Important Topics" icon={Target} fn={getExamTopics} intent="List of Important Exam Topics" />}
                {activeTab === 'predict'   && <PredictTab />}
            </div>
        </div>
    );
}
