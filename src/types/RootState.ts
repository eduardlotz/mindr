import { LobbyState } from 'app/pages/Lobby/slice/types';
import { HomepageState } from 'app/pages/Homepage/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  lobby?: LobbyState;
  Homepage?: HomepageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
