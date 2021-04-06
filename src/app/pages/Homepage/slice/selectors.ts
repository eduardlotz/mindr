import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.Homepage || initialState;

export const selectHomepage = createSelector([selectSlice], state => state);
export const selectModal = createSelector([selectSlice], state => state.modal);
export const selectGameModes = createSelector(
  [selectSlice],
  state => state.gameModes,
);
export const selectGameRulesByName = modeName =>
  createSelector([selectSlice], state =>
    state.gameModes.find(mode => mode.imageClass === modeName),
  );
