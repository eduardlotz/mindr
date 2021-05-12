import doYou from './do-you-pick.jpg';
import doYouPick from './do-you.jpg';
import draw from './draw.jpg';
import drawPick from './draw-pick.jpg';
import guess from './guess.jpg';
import guessResults from './guess-results.jpg';
import location from './location.jpg';
import locationResults from './location-results.jpg';
import mostLikely from './most-likely.jpg';
import mostLikelyResults from './most-likely-results.jpg';
import quiz from './quiz.jpg';
import quizResults from './quiz-result.jpg';
import survey from './survey.jpg';
import surveyResults from './survey-results.jpg';

// const gameImages = {
//   doYou,
//   doYouPick,
//   draw,
//   drawPick,
//   guess,
//   guessResults,
//   location,
//   locationResults,
//   mostLikely,
//   mostLikelyResults,
//   quiz,
//   quizResults,
//   survey,
//   surveyResults,
// };

// export default gameImages;

const gameImages = {
  quiz: [quiz, quizResults, guess, guessResults, location, locationResults],
  mostlikely: [mostLikely, mostLikelyResults],
  survey: [survey, surveyResults],
  drawguess: [draw, drawPick],
  bestartist: [draw, drawPick],
  whoknowsyou: [doYou, doYouPick],
};

export default gameImages;
