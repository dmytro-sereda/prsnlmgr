import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HelpersState, Popup } from "../../utils/interfaces";

const initialState: HelpersState = {
  popup: {
    isPopupActive: false,
    isError: false,
    message: "",
  },
  isMenuOpen: false,
  entryBeingEdited: "",
  isDropdownOpen: false,
};

const helpersSlice = createSlice({
  name: "helpers",
  initialState,
  reducers: {
    updateIsPopupActive(state, action: PayloadAction<boolean>) {
      state.popup.isPopupActive = action.payload;
    },
    updatePopup(state, action: PayloadAction<Popup>) {
      state.popup = action.payload;
    },
    updateEntryBeingEdited(state, action: PayloadAction<string>) {
      state.entryBeingEdited = action.payload;
    },
    updateIsMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },
    updateIsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload;
    },
  },
});

export const {
  updateIsPopupActive,
  updatePopup,
  updateEntryBeingEdited,
  updateIsMenuOpen,
  updateIsDropdownOpen,
} = helpersSlice.actions;

export default helpersSlice.reducer;
