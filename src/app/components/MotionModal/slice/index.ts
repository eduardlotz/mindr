import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ModalState } from './types';

export const initialState: ModalState = {
  isOpen: false,
  title: '',
  content: '',
  mode: 'gameMode',
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.isOpen = action.payload;
    },
    setModalContent(state, action: PayloadAction<string>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.content = action.payload;
    },
    setModalTitle(state, action: PayloadAction<string>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.title = action.payload;
    },
  },
});

export const { actions: modalActions } = slice;

export const useModalSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useModalSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
