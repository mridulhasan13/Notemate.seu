import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Upload from './pages/Upload';
import NoteViewer from './pages/NoteViewer';
import ScrollRestoration from './components/ScrollRestoration';
import Departments from './pages/Departments';

import MenuPage from './pages/Menu';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <ScrollRestoration />
      <div className="bg-glow"></div>
      <div className="bg-glow-right"></div>
      <Navbar />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/note/:id" element={<NoteViewer />} />
          <Route path="/departments/:type" element={<Departments />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
