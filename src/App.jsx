import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse'; /* Used for /search */
import Upload from './pages/Upload';
import NoteViewer from './pages/NoteViewer';
import MenuPage from './pages/Menu';
import AIAssistance from './pages/AIAssistance';
import Information from './pages/Information';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="bg-glow"></div>
      <div className="bg-glow-right"></div>
      <Navbar />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Browse />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/note/:id" element={<NoteViewer />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/ai-assistance" element={<AIAssistance />} />
          <Route path="/information" element={<Information />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
