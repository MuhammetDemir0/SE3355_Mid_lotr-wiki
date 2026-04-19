import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lotrApi } from '../services/lotrService';
import { LoadingSpinner, ErrorBoundary } from '../components/LoadingSpinner';

export function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await lotrApi.getMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} retry={fetchMovies} />;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-amber-400 mb-4 drop-shadow-lg">🎬 Movies</h1>
        <p className="text-amber-300 text-lg mb-12">
          Peter Jackson's cinematic adaptations. The Lord of the Rings and Hobbit series.
        </p>

        {movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-300 text-xl">No movies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  const getMovieColor = (title) => {
    if (title.includes('Fellowship')) return 'from-blue-600 to-blue-800';
    if (title.includes('Two')) return 'from-green-600 to-green-800';
    if (title.includes('Return')) return 'from-orange-600 to-orange-800';
    if (title.includes('Hobbit')) return 'from-amber-600 to-amber-800';
    return 'from-slate-700 to-slate-900';
  };

  return (
    <Link to={`/movie/${movie._id}`}>
      <div className={`bg-gradient-to-br ${getMovieColor(movie.name)} rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105 border-2 border-slate-700 hover:border-amber-500 cursor-pointer h-full`}>
        <div className="p-6 h-full flex flex-col justify-between">
          {/* Movie Icon */}
          <div className="text-5xl text-center mb-4 drop-shadow-lg">🎞️</div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-4">
              {movie.name}
            </h3>
            
            <div className="bg-black bg-opacity-30 rounded p-3 space-y-2">
              {movie.runtimeInMinutes && (
                <p className="text-amber-300 text-sm">
                  ⏱️ Runtime: {movie.runtimeInMinutes} min
                </p>
              )}

              {movie.budgetInMillions && (
                <p className="text-amber-300 text-sm">
                  💰 Budget: ${movie.budgetInMillions}M
                </p>
              )}
              
              {movie.boxOfficeRevenueInMillions && (
                <p className="text-amber-300 text-sm">
                  🎥 Box Office: ${movie.boxOfficeRevenueInMillions}M
                </p>
              )}
              
              {movie.rottenTomatoesScore && (
                <p className="text-amber-300 text-sm">
                  ⭐ IMDb: {movie.rottenTomatoesScore}%
                </p>
              )}
            </div>
          </div>

          {/* View Details Indicator */}
          <div className="text-amber-300 font-bold text-center text-sm bg-black bg-opacity-30 py-2 rounded mt-4">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
}
