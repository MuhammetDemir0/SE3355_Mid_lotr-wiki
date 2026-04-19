import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lotrApi } from '../services/lotrService';
import { LoadingSpinner, ErrorBoundary } from '../components/LoadingSpinner';

export function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharacterDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const charData = await lotrApi.getCharacterDetails(id);
      setCharacter(charData);
      
      try {
        const quotesData = await lotrApi.getCharacterQuotes(id);
        setQuotes(quotesData.slice(0, 10)); // First 10 quotes
      } catch (e) {
        // Quotes may not load, that's okay
        setQuotes([]);
      }
    } catch (err) {
      setError('Failed to load character details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCharacterDetails();
  }, [fetchCharacterDetails]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} retry={fetchCharacterDetails} />;
  if (!character) return <ErrorBoundary error="Character not found." />;

  const getRaceColor = (race) => {
    const colors = {
      'Hobbit': '#10b981',
      'Elf': '#a78bfa',
      'Dwarf': '#f97316',
      'Human': '#3b82f6',
      'Istari': '#6366f1',
      'Orc': '#ef4444',
      'Troll': '#8b5cf6',
      'Dragon': '#dc2626'
    };
    return colors[race] || '#64748b';
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/characters" className="inline-block mb-6 text-amber-400 hover:text-amber-300 font-bold">
          ← Back to Characters
        </Link>

        {/* Character Image Header */}
        {character.image && (
          <div className="mb-6 rounded-lg overflow-hidden border-2 border-amber-600 shadow-2xl bg-slate-900 p-2">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-72 md:h-96 object-contain rounded"
              onError={(e) => {
                if (e.currentTarget.src.includes('/character-fallback.svg')) return;
                e.currentTarget.src = '/character-fallback.svg';
              }}
            />
          </div>
        )}

        {/* Character Title */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-lg p-8 mb-8 border-2 border-amber-700">
          <div className="flex items-center gap-4">
            <span className="text-6xl">🧙</span>
            <div>
              <h1 className="text-4xl font-black text-amber-300 drop-shadow-lg">{character.name}</h1>
              <div className="flex gap-3 mt-2">
                {character.race && (
                  <span 
                    style={{ backgroundColor: getRaceColor(character.race) }}
                    className="px-3 py-1 rounded-full text-white text-sm font-bold"
                  >
                    {character.race}
                  </span>
                )}
                {character.gender && (
                  <span className="px-3 py-1 bg-slate-700 rounded-full text-amber-300 text-sm font-bold">
                    {character.gender}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Panel - Basic Information */}
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-amber-300 mb-6 border-b-2 border-amber-600 pb-3">
              📋 Basic Information
            </h2>
            
            <div className="space-y-4">
              {character.race && (
                <InfoRow icon="👥" label="Race" value={character.race} />
              )}
              
              {character.gender && (
                <InfoRow icon="♀️" label="Gender" value={character.gender} />
              )}
              
              {character.realm && (
                <InfoRow icon="🏰" label="Realm" value={character.realm} />
              )}
              
              {character.birth && (
                <InfoRow icon="📅" label="Birth" value={character.birth} />
              )}
              
              {character.death && (
                <InfoRow icon="💀" label="Death" value={character.death} />
              )}
            </div>
          </div>

          {/* Right Panel - Links */}
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-amber-300 mb-6 border-b-2 border-amber-600 pb-3">
              🔗 Links
            </h2>
            
            <div className="space-y-3">
              {character.wikiUrl && (
                <ExternalLink href={character.wikiUrl} label="Wiki Page" />
              )}
              
              <div className="bg-slate-700 p-3 rounded">
                <p className="text-xs text-amber-400 font-semibold uppercase">API ID</p>
                <p className="text-amber-300 text-sm font-mono break-all mt-1">{character._id}</p>
              </div>

              {character.quote && (
                <div className="bg-gradient-to-r from-amber-900 to-orange-900 p-3 rounded border-l-4 border-amber-400">
                  <p className="text-xs text-amber-300 font-semibold uppercase mb-2">Famous Quote</p>
                  <p className="text-amber-100 italic text-sm">"{character.quote}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appearances Section */}
        {((character.appearances && character.appearances.length > 0) || (character.movies && character.movies.length > 0)) && (
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-amber-300 mb-6 border-b-2 border-amber-600 pb-3">
              🎥 Appearances in the Series
            </h2>

            <div className="flex flex-wrap gap-3">
              {(character.appearances || character.movies || []).map((appearance, index) => (
                <span
                  key={`${appearance}-${index}`}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-700 to-orange-700 text-amber-100 text-sm font-semibold border border-amber-500"
                >
                  {appearance}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quotes Section */}
        {quotes.length > 0 && (
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-amber-300 mb-6 border-b-2 border-amber-600 pb-3">
              💬 Quotes from {character.name}
            </h2>
            
            <div className="space-y-4">
              {quotes.map((quote, index) => (
                <div
                  key={quote._id || index}
                  className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 rounded-lg border-l-4 border-amber-500 hover:border-amber-400 transition duration-200"
                >
                  <p className="text-amber-100 italic">"{quote.dialog}"</p>
                  <p className="text-amber-400 text-sm mt-2 font-semibold">
                    ✦ {quote.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg border-2 border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-amber-300 mb-4 border-b-2 border-amber-600 pb-3">
            ℹ️ About
          </h2>
          <p className="text-amber-200 leading-relaxed">
            {character.name} is one of the legendary characters of Middle-earth. 
            {character.race && ` As a member of the ${character.race} race,`} this character plays an important role in The Lord of the Rings series.
            {quotes.length > 0 && ` The quotes shown above are some of this character's most famous lines.`}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{icon}</span>
      <div className="flex-grow">
        <p className="text-xs text-amber-400 font-semibold uppercase">{label}</p>
        <p className="text-amber-300 text-sm">{value}</p>
      </div>
    </div>
  );
}

function ExternalLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 p-3 rounded text-center text-amber-100 font-bold transition duration-200"
    >
      {label} ↗
    </a>
  );
}
