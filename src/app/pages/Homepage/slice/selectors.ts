import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.home || initialState;

export const selectHomepage = createSelector([selectSlice], state => state);
export const selectTheme = createSelector([selectSlice], state => state.theme);
export const selectModal = createSelector([selectSlice], state => state.modal);
export const selectUsernameError = createSelector(
  [selectSlice],
  state => state.errors.username,
);
export const selectRoomError = createSelector(
  [selectSlice],
  state => state.errors.room,
);
export const selectAvatarError = createSelector(
  [selectSlice],
  state => state.errors.avatar,
);
export const selectGameModes = createSelector(
  [selectSlice],
  state => state.gameModes,
);
export const selectGameRulesByName = modeName =>
  createSelector([selectSlice], state =>
    state.gameModes.find(mode => mode.imageClass === modeName),
  );
