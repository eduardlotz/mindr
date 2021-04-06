import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { HomepageSaga } from './saga';
import { HomepageState } from './types';

export const initialState: HomepageState = {
  modal: {
    isOpen: false,
    title: '',
    imageClass: '',
    content: [],
    mode: 'gameMode',
  },
  gameModes: [{ title: '', imageClass: '', rules: [] }],
};

const slice = createSlice({
  name: 'Homepage',
  initialState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.modal.isOpen = action.payload;
    },
    setModalContent(state, action: PayloadAction<any>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.modal.title = action.payload.title;
      state.modal.imageClass = action.payload.imageClass;
      state.modal.content = action.payload.content;
    },
    setGameModes(state, action: PayloadAction<any>) {
      state.gameModes = action.payload;
    },
  },
});

export const { actions: HomepageActions } = slice;

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: HomepageSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHomepageSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
