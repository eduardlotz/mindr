//array with all game modes & rules
//TODO swap out with real database
export const games = [
  {
    title: 'quiz',
    imageClass: 'quiz',
    images: [
      'quiz',
      'quizResults',
      'guess',
      'guessResults',
      'location',
      'locationResults',
    ],
    isActive: true,
    isAvailable: true,
  },
  {
    title: 'drawguess',
    imageClass: 'draw-and-guess',
    images: ['draw', 'drawPick'],
    isActive: false,
    isAvailable: false,
  },
  {
    title: 'mostlikely',
    imageClass: 'most-likely',
    images: ['mostLikely', 'mostLikelyResults'],
    isActive: false,
    isAvailable: false,
  },
  {
    title: 'bestartist',
    imageClass: 'best-artist',
    images: ['draw'],
    isActive: false,
    isAvailable: false,
  },
  {
    title: 'survey',
    imageClass: 'survey',
    images: ['survey', 'surveyResults'],
    isActive: false,
    isAvailable: false,
  },
  {
    title: 'whoknowsyou',
    imageClass: 'who-knows-you',
    images: ['doYou', 'doYouPick'],
    isActive: false,
    isAvailable: false,
  },
];
