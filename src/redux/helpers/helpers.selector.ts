import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectHelpers = (state: RootState) => state.helpers;

export const selectIsPopupActive = createSelector(
  [selectHelpers],
  (user) => user.popup.isPopupActive
);

export const selectPopup = createSelector(
  [selectHelpers],
  (user) => user.popup
);

export const selectEntryBeingEdited = createSelector(
  [selectHelpers],
  (user) => user.entryBeingEdited
);

export const selectIsMenuOpen = createSelector(
  [selectHelpers],
  (user) => user.isMenuOpen
);
