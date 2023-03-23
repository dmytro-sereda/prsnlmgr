import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserObject, UserState } from "../../utils/interfaces";

const initialState: UserState = {
  userObject: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserObject(state, action: PayloadAction<UserObject>) {
      state.userObject = action.payload;
    },
  },
});

export const { updateUserObject } = userSlice.actions;

export default userSlice.reducer;
