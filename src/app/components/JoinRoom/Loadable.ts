/**
 *
 * Asynchronously loads the component for JoinRoom
 *
 */

import { lazyLoad } from 'utils/loadable';

export const JoinRoom = lazyLoad(
  () => import('./index'),
  module => module.JoinRoom,
);
