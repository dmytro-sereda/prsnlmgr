import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectUser = (state: RootState) => state.user;

export const selectUserEntity = createSelector(
  [selectUser],
  (user) => user.userObject
);

export const selectEntries = createSelector(
  [selectUser],
  (user) => user.entries
);

export const selectFullName = createSelector(
  [selectUser],
  (user) => user.fullName
);
