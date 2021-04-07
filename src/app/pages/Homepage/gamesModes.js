//array with all game modes & rules
//TODO swap out with real database
export const games = [
  {
    title: 'quiz',
    imageClass: 'quiz',
    rules: [
      '1. Every player gets the same question with 4 possible answers.',
      '2. You have 20 seconds to pick the right answer.',
      '3. The faster you answer correctly, the more points you get.',
    ],
  },
  {
    title: 'drawguess',
    imageClass: 'draw-and-guess',
    rules: ['How to play Draw & Guess'],
  },
  {
    title: 'mostlikely',
    imageClass: 'most-likely',
    rules: ['How to play Most Likely'],
  },
  {
    title: 'bestartist',
    imageClass: 'best-artist',
    rules: ['How to play Best artist'],
  },
  {
    title: 'survey',
    imageClass: 'survey',
    rules: ['How to play Survey'],
  },
  {
    title: 'whoknowsyou',
    imageClass: 'who-knows-you',
    rules: ['How to play Who knows you'],
  },
];
