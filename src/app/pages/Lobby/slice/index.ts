import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { lobbySaga } from './saga';
import { LobbyState, User } from './types';

export const initialState: LobbyState = {
  user: {
    name: '',
    avatar: '',
    room: '',
    joinedGroup: false,
    isCreator: false,
    sips: 0,
    points: 0,
  },
  lobby: {
    groupCode: '',
    activeGamemodes: [],
    isStandardMode: true,
    gameLength: 'normal',
    users: [
      {
        id: '',
        name: '',
        avatar: '',
        room: '',
        points: 0,
        sips: 0,
        isCreator: false,
      },
    ],
  },
};

const slice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.user.name = action.payload;
    },
    setAvatarUrl(state, action: PayloadAction<string>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.user.avatar = action.payload;
    },
    setGroupCode(state, action: PayloadAction<string>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.user.room = action.payload.toUpperCase();
    },
    setJoinedGroup(state, action: PayloadAction<boolean>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.user.joinedGroup = action.payload;
    },
    setIsCreator(state, action: PayloadAction<boolean>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.user.isCreator = action.payload;
    },
    setIsStandardMode(state, action: PayloadAction<boolean>) {
      // Here we say lets change the username in my Homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.lobby.isStandardMode = action.payload;
    },
    setUsersInRoom(state, action: PayloadAction<User[]>) {
      state.lobby.users = action.payload;
    },
    setGameLength(state, action: PayloadAction<string>) {
      state.lobby.gameLength = action.payload;
    },
  },
});

export const { actions: lobbyActions } = slice;

export const useLobbySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: lobbySaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useLobbySlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
