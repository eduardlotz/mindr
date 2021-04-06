/**
 *
 * Asynchronously loads the component for GameImage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const GameImage = lazyLoad(
  () => import('./index'),
  module => module.GameImage,
);
