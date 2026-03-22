import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Upload from './pages/Upload';
import NoteViewer from './pages/NoteViewer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/note/:id" element={<NoteViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
