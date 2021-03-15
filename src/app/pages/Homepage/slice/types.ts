/* --- STATE --- */
export interface HomepageState {
  modalIsOpen: boolean;
  modalContent: {
    name: string;
    imageClass: string;
    rules: string;
  };
}
