/* --- STATE --- */
export interface LobbyState {
  user: {
    name: string;
    avatar: string;
    room: string;
    joinedGroup: boolean;
  };
  lobby: {
    groupCode: string;
    activeGamemodes: number[];
    isStandardMode: boolean;
    gameLength: string;
    users: Array<User>;
  };
}

export interface User {
  id: string;
  name: string;
  room: string;
  avatar: string;
}
