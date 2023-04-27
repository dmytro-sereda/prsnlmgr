import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntryEntity, UserObject, UserState } from "../../utils/interfaces";

const initialState: UserState = {
  userObject: null,
  entries: [],
  fullName: "",
  hasCompletedGuide: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserObject(state, action: PayloadAction<UserObject>) {
      state.userObject = action.payload;
    },
    updateEntries(state, action: PayloadAction<[] | EntryEntity[]>) {
      state.entries = action.payload;
    },
    updateFullName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
    updateHasCompletedGuide(state, action: PayloadAction<boolean>) {
      state.hasCompletedGuide = action.payload;
    },
  },
});

export const {
  updateUserObject,
  updateEntries,
  updateFullName,
  updateHasCompletedGuide,
} = userSlice.actions;

export default userSlice.reducer;
