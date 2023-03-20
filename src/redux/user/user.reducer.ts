import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User as FirebaseUser } from "firebase/auth";

const initialState: { userObject: FirebaseUser | null } = {
  userObject: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateUserObject(state, action: PayloadAction<FirebaseUser | null>) {
      state.userObject = action.payload;
    },
  },
});

export const { updateUserObject } = formSlice.actions;

export default formSlice.reducer;
