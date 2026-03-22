import React from 'react';
import { Bot } from 'lucide-react';

export default function AIAssistance() {
    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <Bot size={64} className="text-gradient" style={{ margin: '0 auto 2rem' }} />
            <h1>AI Study Assistant</h1>
            <p className="text-secondary">Your intelligent companion for summarizing notes and generating flashcards is coming soon!</p>
        </div>
    );
}
