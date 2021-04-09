import { LobbyState } from 'app/pages/Lobby/slice/types';
import { HomepageState } from 'app/pages/Homepage/slice/types';
import { ModalState } from 'app/components/MotionModal/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  lobby?: LobbyState;
  home?: HomepageState;
  modal?: ModalState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
