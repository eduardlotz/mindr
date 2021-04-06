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
  }
}
