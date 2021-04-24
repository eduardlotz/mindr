/* --- STATE --- */
export interface HomepageState {
  modal: {
    isOpen: boolean;
    title: string;
    imageClass: string;
    content: Array<string>;
  };
  gameModes: [iGameMode];
  errors: {
    username: iInputError;
    room: iInputError;
    avatar: iInputError;
  };
  theme: string;
}

export interface iGameMode {
  title: string;
  imageClass: string;
  rules: Array<string>;
  isActive: boolean;
  isAvailable: boolean;
}

export interface iInputError {
  message: string;
  isHidden: boolean;
}
