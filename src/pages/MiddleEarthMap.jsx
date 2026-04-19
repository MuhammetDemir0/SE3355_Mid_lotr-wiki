const REGIONS = [
  {
    id: 'shire',
    name: 'The Shire',
    x: 12,
    y: 67,
    significance: 'Home of Frodo, Bilbo, Sam, Merry, and Pippin; the quiet beginning of the story.'
  },
  {
    id: 'bree',
    name: 'Bree',
    x: 20,
    y: 61,
    significance: 'A crossroads town where hobbits meet Aragorn at the Prancing Pony.'
  },
  {
    id: 'rivendell',
    name: 'Rivendell',
    x: 36,
    y: 50,
    significance: 'Elrond’s refuge, where the Fellowship is formed and the quest begins.'
  },
  {
    id: 'moria',
    name: 'Moria',
    x: 41,
    y: 58,
    significance: 'The ancient dwarf realm, remembered for the Bridge of Khazad-dûm and Gandalf’s fall.'
  },
  {
    id: 'lothlorien',
    name: 'Lothlorien',
    x: 48,
    y: 53,
    significance: 'Galadriel’s golden forest, a place of rest and reflection for the Fellowship.'
  },
  {
    id: 'isengard',
    name: 'Isengard',
    x: 41,
    y: 66,
    significance: 'Saruman’s stronghold at Orthanc, later shattered by the Ents.'
  },
  {
    id: 'rohan',
    name: 'Rohan',
    x: 50,
    y: 71,
    significance: 'The land of the horse-lords, central to Helm’s Deep and the ride of the Rohirrim.'
  },
  {
    id: 'gondor',
    name: 'Gondor',
    x: 60,
    y: 79,
    significance: 'The great kingdom of Men, home of Minas Tirith and the final defense against Mordor.'
  },
  {
    id: 'mordor',
    name: 'Mordor',
    x: 74,
    y: 73,
    significance: 'Sauron’s dark realm, where Mount Doom lies and the Ring is destroyed.'
  },
  {
    id: 'mirkwood',
    name: 'Mirkwood',
    x: 66,
    y: 44,
    significance: 'A deep eastern forest tied to the woodland elves and the danger of Dol Guldur.'
  },
  {
    id: 'misty-mountains',
    name: 'Misty Mountains',
    x: 44,
    y: 40,
    significance: 'A mountain chain of passes, mines, and peril crossing the center of Middle-earth.'
  },
  {
    id: 'erebor',
    name: 'Erebor',
    x: 79,
    y: 31,
    significance: 'The Lonely Mountain, home of Thorin’s quest and Smaug’s treasure hoard.'
  }
];

export function MiddleEarthMap() {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black text-amber-400 mb-2 drop-shadow-lg">🗺️ Middle-earth Map</h1>
          <p className="text-amber-300 text-lg">A static map image with region significance notes.</p>
          <p className="text-slate-300 text-xs mt-2">
            The map is shown as a pure visual reference.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
          <div className="xl:col-span-3 bg-slate-900 border-2 border-amber-600 rounded-lg overflow-hidden shadow-2xl">
            <div className="px-4 py-3 border-b border-slate-700 bg-slate-950/80">
              <p className="text-amber-300 font-semibold">Middle-earth Overview</p>
            </div>

            <div className="relative w-full overflow-hidden bg-[#20160f]">
              <img
                src="/middle-earth-map.png"
                alt="Middle-earth map"
                className="w-full h-auto block"
              />
            </div>
          </div>

          <div className="bg-slate-900 border-2 border-slate-700 rounded-lg p-4 h-fit">
            <h2 className="text-xl font-bold text-amber-300 mb-3">Region Significance</h2>
            <div className="space-y-3">
              {REGIONS.map((region) => (
                <div key={region.id} className="rounded border border-slate-700 bg-slate-950/70 p-3">
                  <p className="text-amber-300 font-bold mb-1">{region.name}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{region.significance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleEarthMap;
