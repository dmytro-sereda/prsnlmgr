import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Popup {
  isPopupActive: boolean;
  isError: boolean;
  message: string;
}

const initialState = {
  popup: {
    isPopupActive: false,
    isError: false,
    message: "",
  },
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
  },
});

export const { updateIsPopupActive, updatePopup } = helpersSlice.actions;

export default helpersSlice.reducer;
