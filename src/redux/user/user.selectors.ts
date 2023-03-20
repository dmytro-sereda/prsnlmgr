import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectUser = (state: RootState) => state.user;

export const selectUserEntity = createSelector(
  [selectUser],
  (user) => user.userObject
);
