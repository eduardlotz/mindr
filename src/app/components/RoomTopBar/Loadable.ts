/**
 *
 * Asynchronously loads the component for RoomTopBar
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RoomTopBar = lazyLoad(
  () => import('./index'),
  module => module.RoomTopBar,
);
