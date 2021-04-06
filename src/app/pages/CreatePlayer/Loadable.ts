/**
 *
 * Asynchronously loads the component for CreatePlayer
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CreatePlayer = lazyLoad(
  () => import('./index'),
  module => module.CreatePlayer,
);
