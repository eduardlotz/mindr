/**
 *
 * Asynchronously loads the component for MotionModal
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MotionModal = lazyLoad(
  () => import('./index'),
  module => module.MotionModal,
);
