import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="text-9xl font-black text-amber-600 text-center">🧙‍♂️</div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-amber-400 drop-shadow-lg mb-4">
            Lord of the Rings Wiki
          </h1>
          <p className="text-xl md:text-2xl text-amber-300 mb-8 font-semibold">
            "Three Rings for the Elven-kings under the sky, Nine for Mortal Men doomed to die,<br/>
            Seven for the Dwarf-lords in their halls of stone, One for the Dark Lord on his dark throne..."
          </p>
          <p className="text-lg text-amber-200 max-w-2xl mx-auto">
            Explore Tolkien's legendary universe. Discover characters, books, movies, and more from The Lord of the Rings and The Hobbit.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          <SectionCard 
            icon="📚"
            title="Books"
            description="Explore Tolkien's literary works"
            link="/books"
          />
          <SectionCard 
            icon="👥"
            title="Characters"
            description="Information on 1000+ characters"
            link="/characters"
          />
          <SectionCard 
            icon="🎬"
            title="Movies"
            description="Peter Jackson's cinematic adaptations"
            link="/movies"
          />
          <SectionCard 
            icon="🗺️"
            title="Map"
            description="See a visual overview of Middle-earth regions"
            link="/map"
          />
          <SectionCard 
            icon="🧩"
            title="Quiz"
            description="Test your knowledge and guess character quotes"
            link="/quiz"
          />
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-lg p-8 mb-12 border-2 border-amber-700">
          <h2 className="text-3xl font-bold text-amber-300 mb-6">📖 Welcome!</h2>
          <div className="grid md:grid-cols-2 gap-8 text-amber-50">
            <div>
              <h3 className="text-xl font-bold text-amber-200 mb-4">Explore the Universe</h3>
              <p className="mb-4">
                This wiki is a comprehensive guide to Middle-earth, created by J.R.R. Tolkien. 
                From Hobbits to Elves, Dwarves, and even Dark Powers, you can explore hundreds of characters 
                and thousands of years of history.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-200 mb-4">Data Source</h3>
              <p className="mb-4">
                All data is provided through <span className="font-bold">The One API</span>. 
                This wiki brings together information from books, films, and the extended universe. 
                Every character, book, and film is presented with detailed descriptions.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-slate-800 rounded-lg p-8 border-2 border-slate-700">
          <h2 className="text-3xl font-bold text-amber-300 mb-8">✨ Special Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureItem 
              emoji="🔍"
              title="Smart Search"
              desc="Quickly find characters, books, and movies"
            />
            <FeatureItem 
              emoji="🎯"
              title="Interactive Quiz"
              desc="Guess character quotes and accumulate points"
            />
            <FeatureItem 
              emoji="📱"
              title="Responsive Design"
              desc="Access comfortably from any device"
            />
            <FeatureItem 
              emoji="🎭"
              title="Detailed Profiles"
              desc="Each character's story and detailed information"
            />
            <FeatureItem 
              emoji="🏛️"
              title="Mythology"
              desc="Deep knowledge about the Rings, Dwarves, and Elves"
            />
            <FeatureItem 
              emoji="🎬"
              title="Film Adaptations"
              desc="Discover all details of cinematic adaptations"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t-2 border-amber-600 mt-16 py-8 text-center">
        <p className="text-amber-300">
          "One Ring to rule them all, One Ring to find them..." 🧙‍♂️
        </p>
        <p className="text-slate-400 text-sm mt-2">
          © 2026 LOTR Wiki | Data provided by The One API
        </p>
      </footer>
    </div>
  );
}

function SectionCard({ icon, title, description, link }) {
  return (
    <Link to={link}>
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105 border-2 border-slate-700 hover:border-amber-500 cursor-pointer h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-amber-300 mb-2">{title}</h3>
        <p className="text-amber-200 text-sm">{description}</p>
      </div>
    </Link>
  );
}

function FeatureItem({ emoji, title, desc }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-lg font-bold text-amber-300 mb-2">{title}</h3>
      <p className="text-amber-200 text-sm">{desc}</p>
    </div>
  );
}
