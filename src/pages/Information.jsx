import React from 'react';
import { Info } from 'lucide-react';

export default function Information() {
    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <Info size={64} className="text-gradient" style={{ margin: '0 auto 2rem' }} />
            <h1>About NoteMate</h1>
            <p className="text-secondary">NoteMate is an open-source platform dedicated to helping students share study materials and succeed together.</p>
        </div>
    );
}
