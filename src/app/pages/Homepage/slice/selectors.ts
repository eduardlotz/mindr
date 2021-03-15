import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.Homepage || initialState;

export const selectHomepage = createSelector([selectSlice], state => state);
export const selectModal = createSelector([selectSlice], state => state.modalIsOpen);
export const selectModalContent = createSelector([selectSlice], state => state.modalContent);
