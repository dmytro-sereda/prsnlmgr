import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntryEntity, UserObject, UserState } from "../../utils/interfaces";

const initialState: UserState = {
  userObject: null,
  entries: [],
  fullName: "",
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
  },
});

export const { updateUserObject, updateEntries, updateFullName } =
  userSlice.actions;

export default userSlice.reducer;
