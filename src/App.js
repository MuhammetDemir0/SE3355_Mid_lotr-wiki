import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { BooksList } from './pages/BooksList';
import { BookDetail } from './pages/BookDetail';
import { CharactersList } from './pages/CharactersList';
import { CharacterDetail } from './pages/CharacterDetail';
import { MoviesList } from './pages/MoviesList';
import { MovieDetail } from './pages/MovieDetail';
import Quiz from './pages/Quiz';
import { MiddleEarthMap } from './pages/MiddleEarthMap';
import './App.css';

function App() {
  return (
    <Router>
      <div className="bg-slate-900 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/map" element={<MiddleEarthMap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-black text-amber-400 mb-4">404 - Page Not Found</h1>
        <p className="text-amber-300 text-lg mb-8">
          The page you are looking for seems lost in Middle-earth.
        </p>
        <a href="/" className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-lg transition duration-200">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default App;
