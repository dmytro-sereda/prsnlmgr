export type UserObject = { userID: string; email: string } | null;

export interface ClaimErrors {
  itemName?: string;
  amountPaid?: string;
  date?: string;
  category?: string;
}

export interface Popup {
  isPopupActive: boolean;
  isError: boolean;
  message: string;
}

export interface HelpersState {
  popup: Popup;
}

export interface UserState {
  userObject: UserObject;
}
