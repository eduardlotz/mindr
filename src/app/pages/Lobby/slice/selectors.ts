import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.lobby || initialState;

export const selectLobby = createSelector([selectSlice], state => state);

export const selectUsername = createSelector([selectSlice], state => {
  return state.user.name;
});

export const selectUserAvatar = createSelector([selectSlice], state => {
  return state.user.avatarUrl;
});

export const selectGroupCode = createSelector([selectSlice], state => {
  return state.user.groupCode;
});

export const selectJoinedGroup = createSelector([selectSlice], state => {
  return state.user.joinedGroup;
});

export const selectIsStandardMode = createSelector([selectSlice], state => {
  return state.lobby.isStandardMode;
});

export const selectActiveGamemodes = createSelector([selectSlice], state => {
  return state.lobby.activeGamemodes;
});
export const selectUsersInRoom = createSelector([selectSlice], state => {
  return state.lobby.users;
});
