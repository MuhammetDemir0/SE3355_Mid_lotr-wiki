import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lotrApi } from '../services/lotrService';
import { LoadingSpinner, ErrorBoundary } from '../components/LoadingSpinner';

export function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await lotrApi.getBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to load books. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} retry={fetchBooks} />;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-amber-400 mb-4 drop-shadow-lg">📚 Books</h1>
        <p className="text-amber-300 text-lg mb-12">
          Explore all books written by Tolkien. Each book has chapters and detailed information.
        </p>

        {books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-300 text-xl">No books found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BookCard({ book }) {
  const getBookColor = (title) => {
    if (title.includes('Fellowship')) return 'from-blue-700 to-blue-900';
    if (title.includes('Two')) return 'from-green-700 to-green-900';
    if (title.includes('Return')) return 'from-orange-700 to-orange-900';
    if (title.includes('Hobbit')) return 'from-amber-700 to-amber-900';
    return 'from-slate-700 to-slate-900';
  };

  return (
    <Link to={`/book/${book._id}`}>
      <div className={`bg-gradient-to-br ${getBookColor(book.name)} rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105 border-2 border-slate-700 hover:border-amber-500 cursor-pointer h-full`}>
        <div className="p-6 h-full flex flex-col justify-between">
          {/* Book Icon */}
          <div className="text-5xl text-center mb-4 drop-shadow-lg">📖</div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-3">
              {book.name}
            </h3>
            
            {book.type && (
              <p className="text-amber-200 text-sm mb-2">
                <span className="font-bold">Type:</span> {book.type}
              </p>
            )}

            {book.pages && (
              <p className="text-amber-200 text-sm mb-2">
                <span className="font-bold">Pages:</span> {book.pages}
              </p>
            )}

            {/* Chapter Count */}
            <div className="bg-black bg-opacity-30 rounded p-3 mb-4">
              <p className="text-amber-300 text-sm font-semibold">
                📄 {book.chapterCount || (book.chapters && book.chapters.length) || 'N/A'} Chapters
              </p>
            </div>
          </div>

          {/* Indicator */}
          <div className="text-amber-300 font-bold text-center text-sm bg-black bg-opacity-30 py-2 rounded">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
}
