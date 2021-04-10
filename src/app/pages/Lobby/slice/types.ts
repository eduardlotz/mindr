/* --- STATE --- */
export interface LobbyState {
  user: {
    name: string;
    avatarUrl: string;
    groupCode: string;
    joinedGroup: boolean;
  };
  lobby: {
    groupCode: string;
    activeGamemodes: number[];
    gameMasterId: number;
    isStandardMode: boolean;
    users: Array<User>;
  };
}

export interface User {
  id: number;
  name: string;
  room: number;
  avatar: string;
}
