// Services API integration - Using The One API
const API_BASE = 'https://the-one-api.dev/v2';
const API_KEY = process.env.REACT_APP_LOTR_API_KEY || '';
const API_HEADERS = API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {};

// Mock data for characters, books, and movies when API fails
const MOCK_CHARACTERS = [
  { _id: '1', name: 'Frodo Baggins', race: 'Hobbit', realm: 'The Shire', gender: 'Male', birth: 'S.R. 2968', appearances: ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg/500px-Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg' },
  { _id: '2', name: 'Gandalf', race: 'Istari', realm: 'Middle-earth', gender: 'Male', birth: 'First Age', appearances: ['The Hobbit: An Unexpected Journey', 'The Hobbit: The Desolation of Smaug', 'The Hobbit: The Battle of the Five Armies', 'The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/SDCC13_-_Ian_McKellen.jpg/500px-SDCC13_-_Ian_McKellen.jpg' },
  { _id: '3', name: 'Aragorn', race: 'Human', realm: 'Gondor', gender: 'Male', birth: 'S.R. 2931', appearances: ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Viggo_Mortensen_B_%282020%29.jpg/500px-Viggo_Mortensen_B_%282020%29.jpg' },
  { _id: '4', name: 'Legolas', race: 'Elf', realm: 'Mirkwood', gender: 'Male', birth: 'First Age', appearances: ['The Hobbit: The Desolation of Smaug', 'The Hobbit: The Battle of the Five Armies', 'The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orlando_Bloom_at_the_2024_Toronto_International_Film_Festival_%28cropped2%29.jpg/500px-Orlando_Bloom_at_the_2024_Toronto_International_Film_Festival_%28cropped2%29.jpg' },
  { _id: '5', name: 'Gimli', race: 'Dwarf', realm: 'Erebor', gender: 'Male', birth: 'S.R. 2879', appearances: ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/John_Rhys-Davies_NASA_2025.jpg/500px-John_Rhys-Davies_NASA_2025.jpg' },
  { _id: '6', name: 'Boromir', race: 'Human', realm: 'Gondor', gender: 'Male', birth: 'S.R. 2978', appearances: ['The Fellowship of the Ring'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Sean_Bean_Anemone-25_%28cropped%29.jpg/500px-Sean_Bean_Anemone-25_%28cropped%29.jpg' },
  { _id: '7', name: 'Samwise Gamgee', race: 'Hobbit', realm: 'The Shire', gender: 'Male', birth: 'S.R. 2980', appearances: ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Sean_Astin_%2827506939735%29_%28cropped%29.jpg/500px-Sean_Astin_%2827506939735%29_%28cropped%29.jpg' },
  { _id: '8', name: 'Meriadoc Brandybuck', race: 'Hobbit', realm: 'The Shire', gender: 'Male', birth: 'S.R. 2982', appearances: ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Dominic_Monaghan_by_Gage_Skidmore.jpg/500px-Dominic_Monaghan_by_Gage_Skidmore.jpg' },
  { _id: '9', name: 'Peregrin Took', race: 'Hobbit', realm: 'The Shire', gender: 'Male', birth: 'S.R. 2990', appearances: ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Billy_Boyd_by_Gage_Skidmore.jpg/500px-Billy_Boyd_by_Gage_Skidmore.jpg' },
  { _id: '10', name: 'Elrond', race: 'Elf', realm: 'Rivendell', gender: 'Male', birth: 'First Age', appearances: ['The Hobbit: An Unexpected Journey', 'The Hobbit: The Battle of the Five Armies', 'The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/MJK_08925_Hugo_Weaving_%28Berlinale_2018%29_bw43.jpg/500px-MJK_08925_Hugo_Weaving_%28Berlinale_2018%29_bw43.jpg' },
  { _id: '11', name: 'Galadriel', race: 'Elf', realm: 'Lothlorien', gender: 'Female', birth: 'First Age', appearances: ['The Hobbit: An Unexpected Journey', 'The Hobbit: The Desolation of Smaug', 'The Hobbit: The Battle of the Five Armies', 'The Fellowship of the Ring', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cate_Blanchett-63298_%28cropped_2%29.jpg/500px-Cate_Blanchett-63298_%28cropped_2%29.jpg' },
  { _id: '12', name: 'Sauron', race: 'Dark Lord', realm: 'Mordor', gender: 'Male', birth: 'First Age', appearances: ['The Hobbit: An Unexpected Journey', 'The Hobbit: The Desolation of Smaug', 'The Hobbit: The Battle of the Five Armies', 'The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: '/sauron-option-1.jpg' },
  { _id: '13', name: 'Saruman', race: 'Istari', realm: 'Isengard', gender: 'Male', birth: 'First Age', appearances: ['The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Christopher_Lee_2009.jpg/500px-Christopher_Lee_2009.jpg' },
  { _id: '14', name: 'Bilbo Baggins', race: 'Hobbit', realm: 'The Shire', gender: 'Male', birth: 'S.R. 2890', appearances: ['The Hobbit: An Unexpected Journey', 'The Hobbit: The Desolation of Smaug', 'The Hobbit: The Battle of the Five Armies', 'The Fellowship of the Ring'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Martin_Freeman-5341.jpg/500px-Martin_Freeman-5341.jpg' },
  { _id: '15', name: 'Gollum', race: 'Creature', realm: 'Misty Mountains', gender: 'Male', birth: 'Unknown', appearances: ['The Hobbit: An Unexpected Journey', 'The Hobbit: The Desolation of Smaug', 'The Hobbit: The Battle of the Five Armies', 'The Fellowship of the Ring', 'The Two Towers', 'The Return of the King'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Andy_Serkis_at_MEGACON_Orlando_2025.png/500px-Andy_Serkis_at_MEGACON_Orlando_2025.png' },
];

const MOCK_BOOKS = [
  { _id: '5cf5805fb53e011a64671582', name: 'The Fellowship Of The Ring', pages: 423, chapterCount: 22, type: 'Book', description: 'The first volume of The Lord of the Rings.' },
  { _id: '5cf58077b53e011a64671583', name: 'The Two Towers', pages: 352, chapterCount: 22, type: 'Book', description: 'The second volume of The Lord of the Rings.' },
  { _id: '5cf58080b53e011a64671584', name: 'The Return Of The King', pages: 416, chapterCount: 20, type: 'Book', description: 'The final volume of The Lord of the Rings.' },
];

const MOCK_MOVIES = [
  { _id: '1', name: 'The Lord of the Rings: The Fellowship of the Ring', runtimeInMinutes: 178, budgetInMillions: 93, boxOfficeRevenueInMillions: 898.2, rottenTomatoesScore: 91, releaseDate: '2001-12-19', academyAwardWins: 4, academyAwardNominations: 13, watchUrl: 'https://www.youtube.com/watch?v=V75dMMIW2B4' },
  { _id: '2', name: 'The Lord of the Rings: The Two Towers', runtimeInMinutes: 179, budgetInMillions: 94, boxOfficeRevenueInMillions: 947.5, rottenTomatoesScore: 95, releaseDate: '2002-12-18', academyAwardWins: 2, academyAwardNominations: 6, watchUrl: 'https://www.youtube.com/watch?v=LbfMDwc4azU' },
  { _id: '3', name: 'The Lord of the Rings: The Return of the King', runtimeInMinutes: 201, budgetInMillions: 94, boxOfficeRevenueInMillions: 1119.9, rottenTomatoesScore: 93, releaseDate: '2003-12-17', academyAwardWins: 11, academyAwardNominations: 11, watchUrl: 'https://www.youtube.com/watch?v=r5X-hFf6Bwo' },
  { _id: '4', name: 'The Hobbit: An Unexpected Journey', runtimeInMinutes: 169, budgetInMillions: 200, boxOfficeRevenueInMillions: 1017.0, rottenTomatoesScore: 64, releaseDate: '2012-12-14', academyAwardWins: 0, academyAwardNominations: 3, watchUrl: 'https://www.youtube.com/watch?v=SDnYMbYB-nU' },
  { _id: '5', name: 'The Hobbit: The Desolation of Smaug', runtimeInMinutes: 161, budgetInMillions: 225, boxOfficeRevenueInMillions: 959.0, rottenTomatoesScore: 74, releaseDate: '2013-12-13', academyAwardWins: 0, academyAwardNominations: 3, watchUrl: 'https://www.youtube.com/watch?v=OPVWy1tFXuc' },
  { _id: '6', name: 'The Hobbit: The Battle of the Five Armies', runtimeInMinutes: 164, budgetInMillions: 250, boxOfficeRevenueInMillions: 956.0, rottenTomatoesScore: 59, releaseDate: '2014-12-17', academyAwardWins: 0, academyAwardNominations: 1, watchUrl: 'https://www.youtube.com/watch?v=iVAgTiBrrDA' },
];

const BOOK_METADATA = {
  'the fellowship of the ring': MOCK_BOOKS[0],
  'the two towers': MOCK_BOOKS[1],
  'the return of the king': MOCK_BOOKS[2],
};

const MOVIE_METADATA = {
  'the lord of the rings: the fellowship of the ring': MOCK_MOVIES[0],
  'the lord of the rings: the two towers': MOCK_MOVIES[1],
  'the lord of the rings: the return of the king': MOCK_MOVIES[2],
  'the hobbit: an unexpected journey': MOCK_MOVIES[3],
  'the hobbit: the desolation of smaug': MOCK_MOVIES[4],
  'the hobbit: the battle of the five armies': MOCK_MOVIES[5],
};

function enrichBook(book) {
  if (!book) return book;
  const metadata = BOOK_METADATA[book.name?.toLowerCase()] || {};
  return {
    ...metadata,
    ...book,
    pages: book.pages || metadata.pages,
    chapterCount: metadata.chapterCount || book.chapterCount,
  };
}

function enrichMovie(movie) {
  if (!movie) return movie;
  const metadata = MOVIE_METADATA[movie.name?.toLowerCase()] || {};
  return {
    ...metadata,
    ...movie,
    runtimeInMinutes: movie.runtimeInMinutes || movie.runtimeMinutes || metadata.runtimeInMinutes,
    budgetInMillions: movie.budgetInMillions || movie.budgetMilions || metadata.budgetInMillions,
    boxOfficeRevenueInMillions: movie.boxOfficeRevenueInMillions || metadata.boxOfficeRevenueInMillions,
    rottenTomatoesScore: movie.rottenTomatoesScore || movie.imdbRating || metadata.rottenTomatoesScore,
    releaseDate: movie.releaseDate || metadata.releaseDate,
    academyAwardWins: movie.academyAwardWins || metadata.academyAwardWins,
    academyAwardNominations: movie.academyAwardNominations || metadata.academyAwardNominations,
    watchUrl: movie.watchUrl || metadata.watchUrl,
  };
}

const MOCK_QUOTES = [
  { dialog: 'All we have to decide is what to do with the time that is given to us.', character: 'Gandalf' },
  { dialog: 'Even the smallest person can change the course of the future.', character: 'Galadriel' },
  { dialog: 'One does not simply walk into Mordor.', character: 'Boromir' },
  { dialog: 'I wish it need not have happened in my time.', character: 'Frodo Baggins' },
  { dialog: 'A wizard is never late, nor is he early. He arrives precisely when he means to.', character: 'Gandalf' },
  { dialog: 'There and Back Again.', character: 'Bilbo Baggins' },
  { dialog: 'My precious.', character: 'Gollum' },
  { dialog: 'I cannot carry it for you, but I can carry you!', character: 'Samwise Gamgee' },
  { dialog: 'Not all those who wander are lost.', character: 'Aragorn' },
  { dialog: 'I am a servant of the Secret Fire, wielder of the Flame of Anor.', character: 'Gandalf' },
  { dialog: 'You shall not pass!', character: 'Gandalf' },
  { dialog: 'Fly, you fools!', character: 'Gandalf' },
  { dialog: 'The board is set, the pieces are moving.', character: 'Gandalf' },
  { dialog: 'A day may come when the courage of men fails... but it is not this day.', character: 'Aragorn' },
  { dialog: 'For Frodo.', character: 'Aragorn' },
  { dialog: 'If by my life or death I can protect you, I will.', character: 'Aragorn' },
  { dialog: 'I would have followed you, my brother... my captain... my king.', character: 'Boromir' },
  { dialog: 'They have a cave troll.', character: 'Boromir' },
  { dialog: 'Keep your forked tongue behind your teeth!', character: 'Gimli' },
  { dialog: 'Nobody tosses a Dwarf.', character: 'Gimli' },
  { dialog: 'That still only counts as one!', character: 'Gimli' },
  { dialog: 'A red sun rises. Blood has been spilled this night.', character: 'Legolas' },
  { dialog: 'They are taking the Hobbits to Isengard!', character: 'Legolas' },
  { dialog: 'What about side by side with a friend?', character: 'Legolas' },
  { dialog: 'I made a promise, Mr. Frodo. A promise!', character: 'Samwise Gamgee' },
  { dialog: 'There is some good in this world, and it\'s worth fighting for.', character: 'Samwise Gamgee' },
  { dialog: 'Po-ta-toes! Boil \'em, mash \'em, stick \'em in a stew.', character: 'Samwise Gamgee' },
  { dialog: 'I will take the Ring, though I do not know the way.', character: 'Frodo Baggins' },
  { dialog: 'I wish the Ring had never come to me.', character: 'Frodo Baggins' },
  { dialog: 'It\'s a dangerous business, Frodo, going out your door.', character: 'Bilbo Baggins' },
  { dialog: 'Why shouldn\'t I keep it?', character: 'Bilbo Baggins' },
  { dialog: 'The road goes ever on and on.', character: 'Bilbo Baggins' },
  { dialog: 'We wants it, we needs it. Must have the precious.', character: 'Gollum' },
  { dialog: 'Leave now, and never come back!', character: 'Galadriel' },
  { dialog: 'In place of a Dark Lord, you would have a queen!', character: 'Galadriel' },
  { dialog: 'Do not cite the deep magic to me, wizard.', character: 'Saruman' },
  { dialog: 'Against the power of Mordor there can be no victory.', character: 'Saruman' },
  { dialog: 'The Ring cannot be destroyed, Gimli son of Gloin, by any craft we here possess.', character: 'Elrond' },
  { dialog: 'Men? Men are weak.', character: 'Elrond' },
  { dialog: 'Build me an army worthy of Mordor.', character: 'Sauron' },
  { dialog: 'There is no life in the void, only death.', character: 'Sauron' },
];

export const lotrApi = {
  // Books
  getBooks: async () => {
    try {
      const response = await fetch(`${API_BASE}/book?limit=100`, {
        headers: API_HEADERS
      });
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      return (data.docs || []).map(enrichBook);
    } catch (error) {
      console.error('Error fetching books:', error);
      return MOCK_BOOKS;
    }
  },

  // Book details
  getBookDetails: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/book/${id}?limit=100`, {
        headers: API_HEADERS
      });
      if (!response.ok) throw new Error('Failed to fetch book details');
      const data = await response.json();
      return enrichBook(data.docs[0]);
    } catch (error) {
      console.error('Error fetching book details:', error);
      return MOCK_BOOKS.find(book => book._id === id) || MOCK_BOOKS[0];
    }
  },

  // Book chapters
  getBookChapters: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/book/${id}/chapter?limit=100`, {
        headers: API_HEADERS
      });
      if (!response.ok) throw new Error('Failed to fetch chapters');
      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error('Error fetching chapters:', error);
      throw error;
    }
  },

  // Characters
  getCharacters: async (limit = 50, offset = 0) => {
    try {
      const response = await fetch(
        `${API_BASE}/character?limit=${limit}&offset=${offset}`,
        {
          headers: API_HEADERS
        }
      );
      if (!response.ok) throw new Error('Failed to fetch characters');
      const data = await response.json();
      return { 
        characters: data.docs || [],
        total: data.total
      };
    } catch (error) {
      console.error('Error fetching characters, using mock data:', error);
      // Use mock data as fallback
      const start = offset;
      const end = start + limit;
      return {
        characters: MOCK_CHARACTERS.slice(start, end),
        total: MOCK_CHARACTERS.length
      };
    }
  },

  // Character details
  getCharacterDetails: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/character/${id}?limit=100`, {
        headers: API_HEADERS
      });
      if (!response.ok) throw new Error('Failed to fetch character details');
      const data = await response.json();
      return data.docs[0];
    } catch (error) {
      console.error('Error fetching character details, using mock data:', error);
      // Use mock data as fallback
      return MOCK_CHARACTERS.find(c => c._id === id) || MOCK_CHARACTERS[0];
    }
  },

  // Character quotes
  getCharacterQuotes: async (id, limit = 50) => {
    try {
      const response = await fetch(
        `${API_BASE}/character/${id}/quote?limit=${limit}`,
        {
          headers: API_HEADERS
        }
      );
      if (!response.ok) throw new Error('Failed to fetch quotes');
      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error('Error fetching quotes, using mock data:', error);
      // Use character-specific mock quotes as fallback
      const selectedCharacter = MOCK_CHARACTERS.find(character => character._id === id);
      if (!selectedCharacter) {
        return [];
      }

      const filteredQuotes = MOCK_QUOTES.filter(
        quote => quote.character === selectedCharacter.name
      );

      return filteredQuotes.slice(0, limit);
    }
  },

  // Movies
  getMovies: async () => {
    try {
      const response = await fetch(`${API_BASE}/movie?limit=100`, {
        headers: API_HEADERS
      });
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      return (data.docs || []).map(enrichMovie);
    } catch (error) {
      console.error('Error fetching movies, using mock data:', error);
      // Use mock data as fallback
      return MOCK_MOVIES;
    }
  },

  // Movie details
  getMovieDetails: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/movie/${id}?limit=100`, {
        headers: API_HEADERS
      });
      if (!response.ok) throw new Error('Failed to fetch movie details');
      const data = await response.json();
      return enrichMovie(data.docs[0]);
    } catch (error) {
      console.error('Error fetching movie details, using mock data:', error);
      // Use mock data as fallback
      return MOCK_MOVIES.find(movie => movie._id === id) || MOCK_MOVIES[0];
    }
  },

  // Movie scenes
  getMovieScenes: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/movie/${id}/quote?limit=100`, {
        headers: API_HEADERS
      });
      if (!response.ok) throw new Error('Failed to fetch scenes');
      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error('Error fetching scenes, using mock data:', error);
      // Use mock data as fallback
      return MOCK_QUOTES;
    }
  },

  // Search characters
  searchCharacters: async (keyword) => {
    try {
      const response = await fetch(
        `${API_BASE}/character?limit=100`,
        {
          headers: API_HEADERS
        }
      );
      if (!response.ok) throw new Error('Failed to search characters');
      const data = await response.json();
      const filtered = data.docs.filter(char =>
        char.name.toLowerCase().includes(keyword.toLowerCase())
      );
      return filtered;
    } catch (error) {
      console.error('Error searching characters, using mock data:', error);
      // Use mock data as fallback
      return MOCK_CHARACTERS.filter(char =>
        char.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  },

  // Book characters
  getBookCharacters: async (bookId) => {
    try {
      const response = await fetch(
        `${API_BASE}/book/${bookId}/character?limit=100`,
        {
          headers: API_HEADERS
        }
      );
      if (!response.ok) throw new Error('Failed to fetch book characters');
      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error('Error fetching book characters, using mock data:', error);
      // Return mock data as fallback
      return MOCK_CHARACTERS.slice(0, 12);
    }
  },

  // Book quotes
  getBookQuotes: async (bookId, limit = 50) => {
    try {
      const response = await fetch(
        `${API_BASE}/book/${bookId}/quote?limit=${limit}`,
        {
          headers: API_HEADERS
        }
      );
      if (!response.ok) throw new Error('Failed to fetch book quotes');
      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error('Error fetching book quotes, using mock data:', error);
      // Return mock data as fallback
      return MOCK_QUOTES.slice(0, limit);
    }
  },

  // Movie characters
  getMovieCharacters: async (movieId) => {
    try {
      const response = await fetch(
        `${API_BASE}/movie/${movieId}/character?limit=100`,
        {
          headers: API_HEADERS
        }
      );
      if (!response.ok) throw new Error('Failed to fetch movie characters');
      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error('Error fetching movie characters, using mock data:', error);
      // Return mock data as fallback
      return MOCK_CHARACTERS;
    }
  }
};
