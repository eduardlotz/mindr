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
  },
  gameModes: [
    {
      title: '',
      imageClass: '',
      rules: [],
      isActive: false,
      isAvailable: false,
    },
  ],
  errors: {
    username: {
      message: '',
      isHidden: true,
    },
    room: {
      message: '',
      isHidden: true,
    },
    avatar: {
      message: '',
      isHidden: true,
    },
  },
  theme: 'light',
};

const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.theme = action.payload;
    },
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
    setUsernameError(state, action: PayloadAction<string>) {
      state.errors.username.message = action.payload;
      state.errors.username.isHidden = false;
    },
    setRoomError(state, action: PayloadAction<string>) {
      state.errors.room.message = action.payload;
      state.errors.room.isHidden = false;
    },
    setAvatarError(state, action: PayloadAction<string>) {
      state.errors.avatar.message = action.payload;
      state.errors.avatar.isHidden = false;
    },
    setUsernameErrorHidden(state, action: PayloadAction<boolean>) {
      state.errors.username.isHidden = action.payload;
    },
    setRoomErrorHidden(state, action: PayloadAction<boolean>) {
      state.errors.room.isHidden = action.payload;
    },
    setAvatarErrorHidden(state, action: PayloadAction<boolean>) {
      state.errors.avatar.isHidden = action.payload;
    },
    enableGame(state, action: PayloadAction<number>) {
      state.gameModes[action.payload].isActive = true;
      console.log('reduxstore-- enable game :' + action.payload);
    },
    disableGame(state, action: PayloadAction<number>) {
      console.log('reduxstore-- disable game :' + action.payload);
      state.gameModes[action.payload].isActive = false;
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
