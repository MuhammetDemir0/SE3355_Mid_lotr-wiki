// Loading spinner component
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="animate-spin">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-amber-300 rounded-full"></div>
      </div>
      <p className="ml-4 text-amber-300 text-xl font-semibold">Loading...</p>
    </div>
  );
}

// Error boundary component
export function ErrorBoundary({ error, retry }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-red-900 border-2 border-red-700 rounded-lg p-8 max-w-md w-full">
        <div className="text-red-300 text-3xl font-bold mb-4">⚠️</div>
        <h2 className="text-red-100 text-xl font-bold mb-3">Error</h2>
        <p className="text-red-200 mb-6">
          {error || 'Something went wrong. Please try again later.'}
        </p>
        {retry && (
          <button
            onClick={retry}
            className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
