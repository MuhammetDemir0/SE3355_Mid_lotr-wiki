import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border-b-4 border-amber-500 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-3xl">🧙</div>
            <div>
              <h1 className="brand-title text-2xl font-bold text-amber-300 tracking-wider">LOTR Wiki</h1>
              <p className="text-xs text-amber-300">Lord of the Rings Encyclopedia</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/characters">Characters</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-amber-400 text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-amber-600 pt-4">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/books" onClick={() => setIsOpen(false)}>Books</MobileNavLink>
            <MobileNavLink to="/characters" onClick={() => setIsOpen(false)}>Characters</MobileNavLink>
            <MobileNavLink to="/movies" onClick={() => setIsOpen(false)}>Movies</MobileNavLink>
            <MobileNavLink to="/map" onClick={() => setIsOpen(false)}>Map</MobileNavLink>
            <MobileNavLink to="/quiz" onClick={() => setIsOpen(false)}>Quiz</MobileNavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-amber-200 hover:text-white hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 rounded transition duration-200 font-medium"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2 text-amber-200 hover:text-white hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 rounded transition duration-200 font-medium"
    >
      {children}
    </Link>
  );
}
