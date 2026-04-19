import { useState } from 'react';

export function SearchBar({ onSearch, placeholder = "Ara..." }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-10 bg-slate-800 border-2 border-amber-600 rounded-lg text-white placeholder-amber-300 focus:outline-none focus:border-amber-400 transition duration-200"
        />
        <span className="absolute left-3 text-amber-400 text-lg">🔍</span>
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-amber-400 hover:text-amber-300 text-xl transition duration-200"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
