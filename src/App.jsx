import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse'; /* Used for /search */
import Upload from './pages/Upload';
import NoteViewer from './pages/NoteViewer';

import MenuPage from './pages/Menu';
import AIAssistance from './pages/AIAssistance';
import Information from './pages/Information';
import Teachers from './pages/Teachers';
import Footer from './components/Footer';
import Departments from './pages/Departments';
import ScrollRestoration from './components/ScrollRestoration';
import SearchOverlay from './components/SearchOverlay';
import MenuDrawer from './components/MenuDrawer';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <ScrollRestoration />
      <div className="bg-glow"></div>
      <div className="bg-glow-right"></div>
      
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <MenuDrawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      <Navbar 
        onSearchClick={() => setIsSearchOpen(true)} 
        onMenuClick={() => setIsMenuOpen(true)}
      />
      
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/viewer" element={<NoteViewer />} />
          <Route path="/departments/:type" element={<Departments />} />
          <Route path="/ai-assistance" element={<AIAssistance />} />
          <Route path="/information" element={<Information />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
