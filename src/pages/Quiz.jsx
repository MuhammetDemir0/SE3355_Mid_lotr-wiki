import { Link } from 'react-router-dom';
import { useState } from 'react';

const QUIZ_SIZE = 10;

const CHARACTERS = [
  { _id: '1', name: 'Frodo Baggins', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg/500px-Elijah_Wood_at_the_2025_Sundance_Film_Festival_%28cropped%292.jpg' },
  { _id: '2', name: 'Gandalf', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/SDCC13_-_Ian_McKellen.jpg/500px-SDCC13_-_Ian_McKellen.jpg' },
  { _id: '3', name: 'Aragorn', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Viggo_Mortensen_B_%282020%29.jpg/500px-Viggo_Mortensen_B_%282020%29.jpg' },
  { _id: '4', name: 'Legolas', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orlando_Bloom_at_the_2024_Toronto_International_Film_Festival_%28cropped2%29.jpg/500px-Orlando_Bloom_at_the_2024_Toronto_International_Film_Festival_%28cropped2%29.jpg' },
  { _id: '5', name: 'Gimli', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/John_Rhys-Davies_NASA_2025.jpg/500px-John_Rhys-Davies_NASA_2025.jpg' },
  { _id: '6', name: 'Boromir', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Sean_Bean_Anemone-25_%28cropped%29.jpg/500px-Sean_Bean_Anemone-25_%28cropped%29.jpg' },
  { _id: '7', name: 'Samwise Gamgee', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Sean_Astin_%2827506939735%29_%28cropped%29.jpg/500px-Sean_Astin_%2827506939735%29_%28cropped%29.jpg' },
  { _id: '10', name: 'Elrond', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/MJK_08925_Hugo_Weaving_%28Berlinale_2018%29_bw43.jpg/500px-MJK_08925_Hugo_Weaving_%28Berlinale_2018%29_bw43.jpg' },
  { _id: '11', name: 'Galadriel', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cate_Blanchett-63298_%28cropped_2%29.jpg/500px-Cate_Blanchett-63298_%28cropped_2%29.jpg' },
  { _id: '12', name: 'Sauron', image: '/sauron-option-1.jpg' },
  { _id: '13', name: 'Saruman', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Christopher_Lee_2009.jpg/500px-Christopher_Lee_2009.jpg' },
  { _id: '14', name: 'Bilbo Baggins', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Martin_Freeman-5341.jpg/500px-Martin_Freeman-5341.jpg' }
];

const QUOTES = [
  { dialog: 'All we have to decide is what to do with the time that is given to us.', character: 'Gandalf' },
  { dialog: 'One does not simply walk into Mordor.', character: 'Boromir' },
  { dialog: 'A wizard is never late, nor is he early. He arrives precisely when he means to.', character: 'Gandalf' },
  { dialog: 'Not all those who wander are lost.', character: 'Aragorn' },
  { dialog: 'I cannot carry it for you, but I can carry you!', character: 'Samwise Gamgee' },
  { dialog: 'For Frodo.', character: 'Aragorn' },
  { dialog: 'You shall not pass!', character: 'Gandalf' },
  { dialog: 'My precious.', character: 'Gollum' },
  { dialog: 'There and Back Again.', character: 'Bilbo Baggins' },
  { dialog: 'If by my life or death I can protect you, I will.', character: 'Aragorn' }
];

const MOVIES = [
  { name: 'The Lord of the Rings: The Fellowship of the Ring', releaseDate: 2001, boxOffice: 898.2, imdb: 91 },
  { name: 'The Lord of the Rings: The Two Towers', releaseDate: 2002, boxOffice: 947.5, imdb: 95 },
  { name: 'The Lord of the Rings: The Return of the King', releaseDate: 2003, boxOffice: 1119.9, imdb: 93 },
  { name: 'The Hobbit: An Unexpected Journey', releaseDate: 2012, boxOffice: 1017.0, imdb: 64 },
  { name: 'The Hobbit: The Desolation of Smaug', releaseDate: 2013, boxOffice: 959.0, imdb: 74 },
  { name: 'The Hobbit: The Battle of the Five Armies', releaseDate: 2014, boxOffice: 956.0, imdb: 59 }
];

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

const pickRandom = (items, count) => shuffle(items).slice(0, count);

const normalizeOption = (option) => {
  if (typeof option === 'string') return option;
  if (typeof option === 'number') return String(option);
  if (option && typeof option === 'object' && option.name) return option.name;
  return String(option ?? '');
};

const buildQuoteQuestions = () => {
  return QUOTES.map((quote, index) => {
    const validCharacters = CHARACTERS.filter((c) => c.name !== quote.character);
    const wrongOptions = pickRandom(validCharacters.map((c) => c.name), 3);
    const options = shuffle([quote.character, ...wrongOptions]);

    return {
      id: `quote-${index}`,
      type: 'quote',
      prompt: 'Which character said this quote?',
      quote: quote.dialog,
      options,
      correctAnswer: quote.character
    };
  });
};

const buildReleaseDateQuestions = () => {
  return MOVIES.map((movie, index) => {
    const years = MOVIES.map((m) => m.releaseDate).filter((year) => year !== movie.releaseDate);
    const wrongYears = pickRandom(years, 3).map(String);
    const options = shuffle([String(movie.releaseDate), ...wrongYears]);

    return {
      id: `release-${index}`,
      type: 'movieFact',
      prompt: `In which year was "${movie.name}" released?`,
      options,
      correctAnswer: String(movie.releaseDate)
    };
  });
};

const buildPhotoQuestions = () => {
  return CHARACTERS.slice(0, 10).map((character, index) => {
    const wrongNames = pickRandom(
      CHARACTERS.filter((c) => c.name !== character.name).map((c) => c.name),
      3
    );

    return {
      id: `photo-${index}`,
      type: 'photo',
      prompt: 'Which character is shown in this photo?',
      image: character.image,
      options: shuffle([character.name, ...wrongNames]),
      correctAnswer: character.name
    };
  });
};

const getQuestionTypePools = () => {
  return {
    quote: buildQuoteQuestions(),
    movieFact: buildReleaseDateQuestions(),
    photo: pickRandom(buildPhotoQuestions(), 8)
  };
};

const buildAdvancedMixedQuiz = (quizSize) => {
  const pools = getQuestionTypePools();
  const typeTargets = { quote: 4, movieFact: 3, photo: 3 };
  const pickedByType = { quote: [], movieFact: [], photo: [] };

  // First pass: honor target distribution as much as possible.
  Object.keys(typeTargets).forEach((type) => {
    const target = Math.min(typeTargets[type], pools[type].length);
    pickedByType[type] = pickRandom(pools[type], target);
  });

  // Fill any remaining slots from all leftovers.
  let pickedCount = Object.values(pickedByType).reduce((sum, list) => sum + list.length, 0);
  if (pickedCount < quizSize) {
    const usedIds = new Set(Object.values(pickedByType).flat().map((q) => q.id));
    const leftovers = Object.values(pools)
      .flat()
      .filter((q) => !usedIds.has(q.id));
    const needed = quizSize - pickedCount;
    const fillers = pickRandom(leftovers, needed);

    fillers.forEach((q) => {
      pickedByType[q.type].push(q);
    });
    pickedCount += fillers.length;
  }

  // Build final sequence while avoiding same-type streaks.
  const finalSequence = [];
  let previousType = null;
  const typeKeys = Object.keys(pickedByType);

  while (finalSequence.length < Math.min(quizSize, pickedCount)) {
    const availableTypes = [];
    for (const type of typeKeys) {
      if (pickedByType[type].length > 0) {
        availableTypes.push(type);
      }
    }

    if (availableTypes.length === 0) break;

    // Prefer the type with the most remaining questions while avoiding immediate repetition.
    let chosenType = null;
    let maxRemaining = -1;

    for (const type of availableTypes) {
      if (type !== previousType && pickedByType[type].length > maxRemaining) {
        chosenType = type;
        maxRemaining = pickedByType[type].length;
      }
    }

    if (!chosenType) {
      for (const type of availableTypes) {
        if (pickedByType[type].length > maxRemaining) {
          chosenType = type;
          maxRemaining = pickedByType[type].length;
        }
      }
    }

    const nextQuestion = pickedByType[chosenType].pop();

    finalSequence.push(nextQuestion);
    previousType = chosenType;
  }

  return finalSequence;
};

const Quiz = () => {
  const [gameState, setGameState] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const startQuiz = () => {
    const generatedQuestions = buildAdvancedMixedQuiz(QUIZ_SIZE);

    setQuestions(generatedQuestions);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleAnswer = (answer) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === normalizeOption(questions[currentQuestion].correctAnswer)) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setGameState('finished');
    }
  };

  const restartQuiz = () => {
    setGameState('start');
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const exitQuiz = () => {
    restartQuiz();
    setShowExitConfirm(false);
  };

  if (gameState === 'start') {
    return (
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-6">🧩</div>
          <h1 className="text-5xl font-black text-amber-400 mb-2">LOTR Quiz</h1>
          <p className="text-amber-300 text-lg mb-8">
            Test your knowledge with mixed questions: quotes, movie release facts, and character photos.
          </p>
          <button
            onClick={startQuiz}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-xl rounded-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && questions.length > 0) {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-300 font-semibold">Question {currentQuestion + 1} / {questions.length}</span>
              <div className="flex gap-2 items-center">
                <span className="text-amber-300 font-semibold">Score: {score}</span>
                <button
                  onClick={() => setShowExitConfirm(true)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded transition"
                >
                  Exit
                </button>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 mb-8 border-2 border-amber-600">
            <h2 className="text-2xl font-bold text-amber-300 mb-6">{question.prompt}</h2>

            {question.type === 'quote' && (
              <div className="bg-slate-900 rounded-lg p-6 border-l-4 border-amber-400">
                <p className="text-xl text-white italic">"{question.quote}"</p>
              </div>
            )}

            {question.type === 'photo' && (
              <div className="bg-slate-900 rounded-lg p-4 border-2 border-slate-600 max-w-sm mx-auto">
                <img
                  src={question.image}
                  alt="Character question"
                  className="w-full h-72 object-contain rounded"
                  onError={(e) => {
                    if (e.currentTarget.src.includes('/character-fallback.svg')) return;
                    e.currentTarget.src = '/character-fallback.svg';
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question.options.map((option, idx) => {
              const normalizedOption = normalizeOption(option);
              const normalizedCorrect = normalizeOption(question.correctAnswer);

              return (
              <button
                key={`${normalizedOption}-${idx}`}
                onClick={() => handleAnswer(normalizedOption)}
                disabled={answered}
                className={`p-4 rounded-lg font-bold text-lg transition transform hover:scale-105 ${
                  selectedAnswer === normalizedOption
                    ? normalizedOption === normalizedCorrect
                      ? 'bg-green-600 text-white border-2 border-green-400'
                      : 'bg-red-600 text-white border-2 border-red-400'
                    : answered && normalizedOption === normalizedCorrect
                    ? 'bg-green-600 text-white border-2 border-green-400'
                    : 'bg-slate-700 text-amber-300 border-2 border-slate-600 hover:border-amber-400 hover:bg-slate-600'
                } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {normalizedOption}
              </button>
            );})}
          </div>

          {answered && (
            <div className="text-center">
              <button
                onClick={nextQuestion}
                className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
              </button>
            </div>
          )}

          {/* Exit Confirmation Modal */}
          {showExitConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 border-2 border-amber-600 max-w-md mx-4">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">Exit Quiz?</h3>
                <p className="text-amber-200 mb-6">
                  Are you sure you want to exit? Your progress will be lost.
                </p>
                <p className="text-lg text-amber-400 font-bold mb-6">
                  Current Score: {score} / {questions.length}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={exitQuiz}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                  >
                    Exit Quiz
                  </button>
                  <button
                    onClick={() => setShowExitConfirm(false)}
                    className="flex-1 px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / questions.length) * 100);
    let performanceMessage = '';
    let performanceEmoji = '';

    if (percentage === 100) {
      performanceMessage = 'Perfect! You are a true Master of Middle-earth!';
      performanceEmoji = '👑';
    } else if (percentage >= 80) {
      performanceMessage = 'Excellent! Your LOTR knowledge is exceptional!';
      performanceEmoji = '⭐';
    } else if (percentage >= 60) {
      performanceMessage = 'Great job! You know the story well!';
      performanceEmoji = '🧙';
    } else if (percentage >= 40) {
      performanceMessage = 'Good effort! Keep exploring Middle-earth!';
      performanceEmoji = '🗡️';
    } else {
      performanceMessage = 'Keep learning! Read more about LOTR!';
      performanceEmoji = '📖';
    }

    return (
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-6">{performanceEmoji}</div>
          <h1 className="text-5xl font-black text-amber-400 mb-4">Quiz Complete!</h1>

          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 mb-8 border-2 border-amber-600">
            <p className="text-6xl font-black text-amber-300 mb-2">{score}/{questions.length}</p>
            <p className="text-3xl text-amber-400 font-bold mb-2">{percentage}%</p>
            <p className="text-xl text-amber-300">{performanceMessage}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-xl rounded-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              Play Again
            </button>

            <Link
              to="/"
              className="px-8 py-4 bg-slate-700 border-2 border-amber-500 text-amber-200 font-bold text-xl rounded-lg hover:bg-slate-600 hover:shadow-2xl transition transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Quiz;
