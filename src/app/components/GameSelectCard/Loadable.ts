/**
 *
 * Asynchronously loads the component for GameSelectCard
 *
 */

import { lazyLoad } from 'utils/loadable';

export const GameSelectCard = lazyLoad(
  () => import('./index'),
  module => module.GameSelectCard,
);
