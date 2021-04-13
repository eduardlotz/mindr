/* --- STATE --- */
export interface HomepageState {
  modal: {
    isOpen: boolean;
    title: string;
    imageClass: string;
    content: Array<string>;
  };
  gameModes: [iGameMode];
}

export interface iGameMode {
  title: string;
  imageClass: string;
  rules: Array<string>;
  isActive: boolean;
  isAvailable: boolean;
}
