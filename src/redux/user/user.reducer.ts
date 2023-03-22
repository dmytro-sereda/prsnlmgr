import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User as FirebaseUser } from "firebase/auth";

export type UserObject = { userID: string; email: string } | null;

interface UserState {
  userObject: UserObject;
}

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
