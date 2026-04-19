import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { CharacterCard } from '../components/CharacterCard';
import { lotrApi } from '../services/lotrService';
import { LoadingSpinner, ErrorBoundary } from '../components/LoadingSpinner';

export function CharactersList() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [raceFilter, setRaceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Race types
  const races = [
    'all', 'Hobbit', 'Elf', 'Dwarf', 'Human', 'Istari', 'Orc', 'Troll', 'Dragon'
  ];

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    // Keep search behavior intuitive: searching should not be silently blocked by an old race filter.
    if (value.trim() && raceFilter !== 'all') {
      setRaceFilter('all');
    }
  };

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      let allChars = [];
      let offset = 0;
      
      // Fetch all characters from API with pagination
      while (true) {
        const data = await lotrApi.getCharacters(50, offset);
        if (data.characters.length === 0) break;
        allChars = [...allChars, ...data.characters];
        offset += 50;
      }
      
      setAllCharacters(allChars);
      setFilteredCharacters(allChars);
    } catch (err) {
      setError('Failed to load characters. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search and filtering
  useEffect(() => {
    let filtered = allCharacters;
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // Search filter
    if (normalizedQuery) {
      filtered = filtered.filter(char =>
        (char.name || '').toLowerCase().includes(normalizedQuery)
      );
    }

    // Race filter
    if (raceFilter !== 'all') {
      filtered = filtered.filter(char =>
        (char.race || '').toLowerCase() === raceFilter.toLowerCase()
      );
    }

    setFilteredCharacters(filtered);
    setCurrentPage(1);
  }, [searchQuery, raceFilter, allCharacters]);

  // Pagination
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCharacters = filteredCharacters.slice(startIdx, startIdx + itemsPerPage);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} retry={fetchCharacters} />;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-amber-400 mb-2 drop-shadow-lg">👥 Characters</h1>
        <p className="text-amber-300 text-lg mb-8">
          {allCharacters.length} characters found. Search or filter.
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search character name... (Ex: Gandalf, Frodo)"
          />
        </div>

        {/* Filters */}
        <div className="mb-8 bg-slate-800 rounded-lg p-6 border-2 border-slate-700">
          <h3 className="text-amber-300 font-bold mb-4">Race Filter:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {races.map(race => (
              <button
                key={race}
                onClick={() => setRaceFilter(race)}
                className={`px-4 py-2 rounded font-semibold transition duration-200 ${
                  raceFilter === race
                    ? 'bg-amber-600 text-white border-2 border-amber-400'
                    : 'bg-slate-700 text-amber-300 border-2 border-slate-600 hover:border-amber-500'
                }`}
              >
                {race === 'all' ? 'All' : race}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {paginatedCharacters.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-lg border-2 border-slate-700">
            <p className="text-amber-300 text-xl">
              {searchQuery ? `No characters found for "${searchQuery}".` : 'No characters found.'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-amber-300 font-semibold">
              Showing: {paginatedCharacters.length} / {filteredCharacters.length}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {paginatedCharacters.map((character) => (
                <CharacterCard key={character._id} character={character} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-amber-600 text-white rounded font-bold hover:bg-amber-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded font-bold transition ${
                      currentPage === page
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-700 text-amber-300 hover:bg-slate-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-amber-600 text-white rounded font-bold hover:bg-amber-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
