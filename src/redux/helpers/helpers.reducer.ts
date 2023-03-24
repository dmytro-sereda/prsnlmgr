import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HelpersState, Popup } from "../../utils/interfaces";

const initialState: HelpersState = {
  popup: {
    isPopupActive: false,
    isError: false,
    message: "",
  },
  entryBeingEdited: "",
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
  },
});

export const { updateIsPopupActive, updatePopup, updateEntryBeingEdited } =
  helpersSlice.actions;

export default helpersSlice.reducer;
