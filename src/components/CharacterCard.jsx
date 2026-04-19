import { Link } from 'react-router-dom';

export function CharacterCard({ character }) {
  const getRaceColor = (race) => {
    const colors = {
      'Hobbit': 'from-emerald-700 to-emerald-900',
      'Elf': 'from-purple-700 to-purple-900',
      'Dwarf': 'from-orange-700 to-orange-900',
      'Human': 'from-blue-700 to-blue-900',
      'Istari': 'from-indigo-700 to-indigo-900',
      'Orc': 'from-red-700 to-red-900',
      'default': 'from-slate-700 to-slate-900'
    };
    return colors[race] || colors.default;
  };

  const bgGradient = getRaceColor(character.race);
  const appearances = character.appearances || character.movies || [];
  const appearancePreview = appearances.slice(0, 3).join(', ');
  const extraAppearances = appearances.length > 3 ? appearances.length - 3 : 0;

  return (
    <Link to={`/character/${character._id}`}>
      <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105 border-2 border-slate-700 hover:border-amber-500 cursor-pointer flex flex-col md:flex-row">
        {/* Character Image - Left Side */}
        {character.image && (
          <div className="w-full md:w-48 h-56 md:h-auto overflow-hidden bg-slate-800 flex items-center justify-center p-2 flex-shrink-0">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-full object-contain rounded"
              onError={(e) => {
                if (e.currentTarget.src.includes('/character-fallback.svg')) return;
                e.currentTarget.src = '/character-fallback.svg';
              }}
            />
          </div>
        )}

        {/* Content - Right Side */}
        <div className="flex-1 flex flex-col">
          {/* Header Background */}
          <div className={`bg-gradient-to-r ${bgGradient} p-4 flex items-center justify-center text-center`}>
            <h3 className="text-xl font-bold text-white drop-shadow-lg line-clamp-2">
              {character.name}
            </h3>
          </div>

          {/* Details */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            {/* Race */}
            {character.race && (
              <div className="mb-2">
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest">Race</p>
                <p className="text-sm text-amber-300">{character.race}</p>
              </div>
            )}

            {/* Realm */}
            {character.realm && (
              <div className="mb-2">
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest">Realm</p>
                <p className="text-sm text-amber-300 line-clamp-2">{character.realm}</p>
              </div>
            )}

            {/* Appearances */}
            {appearances.length > 0 && (
              <div className="mb-2 p-3 bg-slate-700 rounded-lg border-l-4 border-amber-500">
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest mb-1">Appearances</p>
                <p className="text-sm text-amber-200 font-medium">
                  {appearancePreview}
                  {extraAppearances > 0 && <span className="text-amber-400"> +{extraAppearances} more</span>}
                </p>
              </div>
            )}

            {/* Description */}
            {character.wikiUrl && (
              <p className="text-xs text-slate-400 italic mt-auto">
                Click for more details →
              </p>
            )}
          </div>

          {/* Bottom Banner */}
          <div className="bg-slate-700 px-4 py-2 text-center border-t border-slate-600 mt-auto">
            <span className="text-xs text-amber-300 font-semibold">VIEW DETAILS</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
