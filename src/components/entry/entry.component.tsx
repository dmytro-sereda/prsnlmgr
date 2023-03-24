import React from "react";
import { Icon } from "@iconify/react";
import {
  DeleteButton,
  DoneEditingButton,
  EditButton,
  EntryContainer,
} from "./entry.styles";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  updateEntryBeingEdited,
  updateIsPopupActive,
  updatePopup,
} from "../../redux/helpers/helpers.reducer";
import { EntryEntity } from "../../utils/interfaces";
import { selectEntryBeingEdited } from "../../redux/helpers/helpers.selector";

interface Props {
  entry: EntryEntity;
}

const Entry: React.FC<Props> = ({ entry }) => {
  // GLOBAL STATE
  const entryBeingEdited = useAppSelector(selectEntryBeingEdited);
  const dispatch = useAppDispatch();

  // Date config
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(entry.date);
  const day = date.getDate();
  const month = monthNames[date.getMonth()].slice(0, 3);
  const year = date.getFullYear();

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
      {entryBeingEdited === entry.id ? (
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
          <span>{entry.itemName}</span>
          <span>${entry.amountPaid.toFixed(2)}</span>
          <span>{`${day} ${month} ${year}`}</span>
          <span>{entry.category}</span>
          <span>{entry.additionalInfo}</span>
        </>
      )}
      {entryBeingEdited === entry.id ? (
        <DoneEditingButton onClick={() => dispatch(updateEntryBeingEdited(""))}>
          Done
        </DoneEditingButton>
      ) : (
        <>
          <EditButton
            onClick={() => dispatch(updateEntryBeingEdited(entry.id))}
          >
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
