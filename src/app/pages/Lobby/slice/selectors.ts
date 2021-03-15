import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.lobby || initialState;

export const selectLobby = createSelector([selectSlice], state => state);
