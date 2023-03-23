import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { DeleteButton, EditButton, EntryContainer } from "./entry.styles";
import { useAppDispatch } from "../../utils/hooks";
import {
  updateIsPopupActive,
  updatePopup,
} from "../../redux/helpers/helpers.reducer";

const Entry: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmation) return;

    // Delete from the db
    dispatch(
      updatePopup({
        message: "✅ Entry successfully removed",
        isError: false,
        isPopupActive: true,
      })
    );
    setTimeout(() => {
      dispatch(updateIsPopupActive(false));
    }, 3000);
  };
  return (
    <EntryContainer>
      {isEditing ? (
        <>
          <input type="text" />
          <input type="number" />
          <input type="date" />
          <select name="category">
            <option value=""></option>
            <option value="">Food</option>
          </select>
          <textarea name="additionalInfo"></textarea>
        </>
      ) : (
        <>
          <span>Name</span>
          <span>$5.00</span>
          <span>21 Apr 2004</span>
          <span>Hygiene</span>
          <span></span>
        </>
      )}
      {isEditing ? (
        <button onClick={() => setIsEditing(false)}>Done</button>
      ) : (
        <>
          <EditButton onClick={() => setIsEditing(true)}>
            <Icon icon="ic:baseline-edit" width="19" color="#382E54" />
          </EditButton>
          <DeleteButton onClick={handleDeleteButton}>
            <Icon icon="ph:trash" width="19" color="#fff" />
          </DeleteButton>
        </>
      )}
    </EntryContainer>
  );
};

export default Entry;
