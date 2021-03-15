/**
 *
 * Asynchronously loads the component for Lobby
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Lobby = lazyLoad(
  () => import('./index'),
  module => module.Lobby,
);
