import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lotrApi } from '../services/lotrService';
import { LoadingSpinner, ErrorBoundary } from '../components/LoadingSpinner';

export function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const bookData = await lotrApi.getBookDetails(id);
      const chaptersData = await lotrApi.getBookChapters(id);
      
      setBook(bookData);
      setChapters(chaptersData);
      setCharacters([]); // Empty for now as API doesn't support book-specific queries
      setQuotes([]); // Empty for now as API doesn't support book-specific queries
    } catch (err) {
      setError('Failed to load book details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} retry={fetchBookDetails} />;
  if (!book) return <ErrorBoundary error="Book not found." />;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/books" className="inline-block mb-6 text-amber-400 hover:text-amber-300 font-bold">
          ← Back to Books
        </Link>

        {/* Book Header */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-lg p-8 mb-8 border-2 border-amber-700">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📖</span>
            <div>
              <h1 className="text-4xl font-black text-amber-300 drop-shadow-lg">{book.name}</h1>
              <p className="text-amber-200">
                {book.type || 'Book'}{book.pages ? ` • ${book.pages} pages` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📄" title="Pages" value={book.pages || 'N/A'} />
          <StatCard icon="📑" title="Chapter Count" value={chapters.length} />
          <StatCard icon="📚" title="Type" value={book.type || 'N/A'} />
          <StatCard icon="🔗" title="API ID" value={book._id.substring(0, 8) + '...'} />
        </div>

        {/* Chapters */}
        <div className="bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4 border-b-2 border-amber-600">
            <h2 className="text-2xl font-bold text-amber-300">📑 Chapters ({chapters.length})</h2>
          </div>

          <div className="p-6">
            {chapters.length === 0 ? (
              <p className="text-amber-300 text-center py-8">No chapter information found.</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter._id}
                    className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 rounded hover:bg-gradient-to-r hover:from-amber-700 hover:to-amber-800 transition duration-200 border-l-4 border-amber-600"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-lg min-w-8">{index + 1}.</span>
                      <div className="flex-grow">
                        <h4 className="text-amber-300 font-semibold">{chapter.chapterName || chapter.name || 'Chapter'}</h4>
                        <p className="text-amber-200 text-sm mt-1">
                          Book {chapter.book}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Characters Section */}
        {characters.length > 0 && (
          <div className="mt-8 bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4 border-b-2 border-amber-600">
              <h2 className="text-2xl font-bold text-amber-300">👥 Characters ({characters.length})</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <Link key={character._id} to={`/character/${character._id}`}>
                    <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-4 rounded hover:from-amber-700 hover:to-amber-800 transition duration-200 border-l-4 border-amber-600 h-full">
                      <h4 className="text-amber-300 font-semibold text-lg mb-2">{character.name}</h4>
                      {character.race && (
                        <p className="text-amber-200 text-sm">
                          <span className="font-bold">Race:</span> {character.race}
                        </p>
                      )}
                      {character.realm && (
                        <p className="text-amber-200 text-sm">
                          <span className="font-bold">Realm:</span> {character.realm}
                        </p>
                      )}
                      <p className="text-amber-400 text-xs mt-3 font-semibold">Details →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quotes Section */}
        {quotes.length > 0 && (
          <div className="mt-8 bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4 border-b-2 border-amber-600">
              <h2 className="text-2xl font-bold text-amber-300">💬 Famous Quotes ({quotes.length})</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {quotes.map((quote, index) => (
                  <div
                    key={quote._id}
                    className="bg-gradient-to-r from-amber-900 to-orange-900 p-4 rounded border-l-4 border-amber-400"
                  >
                    <p className="text-amber-100 italic mb-2 leading-relaxed">
                      "{quote.dialog || quote.content || 'Quote information could not be loaded'}"
                    </p>
                    {quote.character && (
                      <p className="text-amber-300 text-sm font-semibold">
                        — {quote.character}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-slate-800 rounded-lg p-6 border-2 border-slate-700">
          <h3 className="text-xl font-bold text-amber-300 mb-4">ℹ️ About</h3>
          <p className="text-amber-200 leading-relaxed">
            This book is part of Tolkien's Lord of the Rings series. 
            Each chapter contains an important part of Middle-earth's epic story.
            The chapter titles and page count are displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border-2 border-slate-700 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-amber-400 text-sm font-semibold uppercase">{title}</p>
      <p className="text-amber-300 text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
