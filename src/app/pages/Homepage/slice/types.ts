/* --- STATE --- */
export interface HomepageState {
  modal: {
    isOpen: boolean;
    title: string;
    imageClass: string;
    content: Array<string>;
    mode: string;
  };
  gameModes: [
    {
      title: string;
      imageClass: string;
      rules: Array<string>;
    },
  ];
}
