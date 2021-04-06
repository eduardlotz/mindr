/**
 *
 * Asynchronously loads the component for Help
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Help = lazyLoad(
  () => import('./index'),
  module => module.Help,
);
