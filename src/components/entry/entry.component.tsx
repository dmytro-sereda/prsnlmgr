import React, { useState } from "react";
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
  updatePopup,
} from "../../redux/helpers/helpers.reducer";
import { EntryEntity } from "../../utils/interfaces";
import { selectEntryBeingEdited } from "../../redux/helpers/helpers.selector";
import { ref, update } from "firebase/database";
import { db } from "../../firebase";
import { selectUserEntity } from "../../redux/user/user.selectors";

interface Props {
  entry: EntryEntity;
}

const Entry: React.FC<Props> = ({ entry }) => {
  // LOCAL STATE
  const [entryUpdated, setEntryUpdated] = useState(entry);

  // GLOBAL STATE
  const entryBeingEdited = useAppSelector(selectEntryBeingEdited);
  const user = useAppSelector(selectUserEntity);
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
  const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  const monthName = monthNames[date.getMonth()].slice(0, 3);
  const year = date.getFullYear();

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmation) return;

    // Delete from the db
    update(ref(db), { [`entries/${user?.userID}/${entry.id}`]: null });

    // Show popup
    dispatch(
      updatePopup({
        message: "✅ Entry successfully removed",
        isError: false,
        isPopupActive: true,
      })
    );
  };

  const handleEditEntryChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    console.log(value);
    setEntryUpdated({ ...entryUpdated, [name]: value });
  };

  const handleEditSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Validate data

    // Update record
    update(ref(db), {
      [`entries/${user?.userID}/${entry.id}`]: {
        ...entryUpdated,
        amountPaid: +entryUpdated.amountPaid,
        date: new Date(entryUpdated.date).getTime(),
      },
    });

    // Quit edit mode
    dispatch(updateEntryBeingEdited(""));
  };

  return (
    <EntryContainer>
      {entryBeingEdited === entry.id ? (
        <>
          <input
            onChange={handleEditEntryChange}
            value={entryUpdated.itemName}
            name="itemName"
            type="text"
          />
          <input
            onChange={handleEditEntryChange}
            value={entryUpdated.amountPaid}
            name="amountPaid"
            type="number"
          />
          <input
            onChange={handleEditEntryChange}
            value={
              typeof entryUpdated.date === "number"
                ? `${year}-${month}-${day < 10 ? "0" + day : day}`
                : entryUpdated.date
            }
            name="date"
            type="date"
          />
          <select
            onChange={handleEditEntryChange}
            value={entryUpdated.category}
            name="category"
          >
            <option value=""></option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="vehicle">Vehicle</option>
            <option value="insurance">Insurance</option>
            <option value="medical">Medical</option>
            <option value="vacation">Vacation</option>
            <option value="clothes">Clothes</option>
            <option value="electronics">Electronics</option>
            <option value="accessorices">Accessorices</option>
            <option value="pleasureEntertainment">
              Pleasure & entertainment
            </option>
          </select>
          <textarea
            onChange={handleEditEntryChange}
            value={entryUpdated.additionalInfo}
            name="additionalInfo"
          ></textarea>
        </>
      ) : (
        <>
          <span>{entry.itemName}</span>
          <span>${entry.amountPaid.toFixed(2)}</span>
          <span>{`${day} ${monthName} ${year}`}</span>
          <span>{entry.category}</span>
          <span>{entry.additionalInfo}</span>
        </>
      )}
      {entryBeingEdited === entry.id ? (
        <DoneEditingButton onClick={handleEditSubmit}>Done</DoneEditingButton>
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
