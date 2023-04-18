export type UserObject = {
  userID: string;
  email: string;
  emailVerified: boolean;
} | null;

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
  entryBeingEdited: string;
  isMenuOpen: boolean;
  isDropdownOpen: boolean;
}

export interface UserState {
  userObject: UserObject;
  entries: [] | EntryEntity[];
  fullName: string;
}

export interface EntryEntity {
  additionalInfo: string;
  amountPaid: number;
  category: string;
  date: number;
  id: string;
  itemName: "One more";
}
