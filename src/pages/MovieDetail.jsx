import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lotrApi } from '../services/lotrService';
import { LoadingSpinner, ErrorBoundary } from '../components/LoadingSpinner';

export function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovieDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const movieData = await lotrApi.getMovieDetails(id);
      setMovie(movieData);
      
      try {
        const scenesData = await lotrApi.getMovieScenes(id);
        setScenes(scenesData.slice(0, 24)); // First 24 scenes/quotes
      } catch (e) {
        setScenes([]);
      }
    } catch (err) {
      setError('Failed to load movie details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} retry={fetchMovieDetails} />;
  if (!movie) return <ErrorBoundary error="Movie not found." />;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/movies" className="inline-block mb-6 text-amber-400 hover:text-amber-300 font-bold">
          ← Back to Movies
        </Link>

        {/* Movie Title Header */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-lg p-8 mb-8 border-2 border-amber-700">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🎬</span>
            <div>
              <h1 className="text-4xl font-black text-amber-300 drop-shadow-lg">{movie.name}</h1>
              {movie.academyAwardNominations && (
                <p className="text-amber-200 text-sm">🏆 Academy Award Nominee</p>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {movie.runtimeInMinutes && (
            <StatCard icon="⏱️" title="Duration" value={`${movie.runtimeInMinutes} min`} />
          )}
          
          {movie.budgetInMillions && (
            <StatCard icon="💰" title="Budget" value={`$${movie.budgetInMillions}M`} />
          )}
          
          {movie.boxOfficeRevenueInMillions && (
            <StatCard icon="🎥" title="Box Office" value={`$${movie.boxOfficeRevenueInMillions}M`} />
          )}
          
          {movie.rottenTomatoesScore && (
            <StatCard icon="⭐" title="IMDb Rating" value={`${movie.rottenTomatoesScore}%`} />
          )}
        </div>

        {/* Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Panel - Information */}
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-amber-300 mb-6 border-b-2 border-amber-600 pb-3">
              📋 Information
            </h2>
            
            <div className="space-y-4">
              {movie.releaseDate && (
                <InfoRow icon="📅" label="Release Date" value={new Date(movie.releaseDate).toLocaleDateString('en-US')} />
              )}
              
              {movie.runtimeInMinutes && (
                <InfoRow icon="⏱️" label="Duration" value={`${movie.runtimeInMinutes} minutes`} />
              )}
              
              {movie.academyAwardWins > 0 && (
                <InfoRow icon="🏆" label="Academy Awards Won" value={`${movie.academyAwardWins} awards`} />
              )}
              
              {movie.academyAwardNominations && (
                <InfoRow icon="⭐" label="Academy Award Nominations" value={`${movie.academyAwardNominations} nominations`} />
              )}
            </div>
          </div>

          {/* Right Panel - Production */}
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-amber-300 mb-6 border-b-2 border-amber-600 pb-3">
              🎬 Production
            </h2>
            
            <div className="space-y-3">
              {movie.budgetInMillions && (
                <div className="bg-slate-700 p-3 rounded">
                  <p className="text-xs text-amber-400 font-semibold uppercase">Budget</p>
                  <p className="text-amber-300 text-lg font-bold">${movie.budgetInMillions} Million</p>
                </div>
              )}

              {movie.boxOfficeRevenueInMillions && (
                <div className="bg-slate-700 p-3 rounded">
                  <p className="text-xs text-amber-400 font-semibold uppercase">Box Office Revenue</p>
                  <p className="text-amber-300 text-lg font-bold">${movie.boxOfficeRevenueInMillions} Million</p>
                </div>
              )}

              {movie.rottenTomatoesScore && (
                <div className="bg-slate-700 p-3 rounded">
                  <p className="text-xs text-amber-400 font-semibold uppercase">IMDb Rating</p>
                  <p className="text-amber-300 text-lg font-bold">{movie.rottenTomatoesScore}%</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Link Section */}
        {movie.watchUrl && (
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-amber-300 mb-6 border-b-2 border-amber-600 pb-3">
              🔗 Link
            </h2>

            <div className="space-y-4">
              <p className="text-amber-200 leading-relaxed">
                Use the link below to open a viewing page for this film.
              </p>
              <ExternalLink href={movie.watchUrl} label="Open Viewing Link" />
            </div>
          </div>
        )}

        {/* Famous Quotes Section */}
        {scenes.length > 0 && (
          <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-amber-300 mb-6 border-b-2 border-amber-600 pb-3">
              💬 Famous Quotes from the Movie
            </h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {scenes.map((scene, index) => (
                <div
                  key={scene._id || index}
                  className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 rounded-lg border-l-4 border-amber-500"
                >
                  <p className="text-amber-100 italic mb-2">"{scene.dialog}"</p>
                  <p className="text-amber-400 text-sm font-semibold">
                    — {scene.character}
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
            {movie.name} is a film from Peter Jackson's The Lord of the Rings series.
            {movie.releaseDate && ` It was released in ${new Date(movie.releaseDate).getFullYear()}.`}
            {movie.academyAwardWins > 0 && ` It won ${movie.academyAwardWins} Academy Awards.`}
            {' '}This film is a landmark work in cinematography, sound design, and special effects.
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

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border-2 border-slate-700 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-amber-400 text-xs font-semibold uppercase">{title}</p>
      <p className="text-amber-300 text-lg font-bold mt-1">{value}</p>
    </div>
  );
}

function ExternalLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 p-4 rounded-lg text-center text-amber-100 font-bold transition duration-200 border border-amber-500"
    >
      {label} ↗
    </a>
  );
}
