import React, { useState } from "react";
import {
  ErrorMessage,
  Input,
  InputContainer,
  Label,
  PrimaryButton,
  RequiredStar,
  Select,
  Textarea,
} from "../../global";
import { updatePopup } from "../../redux/helpers/helpers.reducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { ClaimErrors } from "../../utils/interfaces";
import { schemaFactory } from "../../utils/schemaFactory";
import { ClaimFormContainer } from "./claim-form.styles";
import { db } from "../../firebase";
import { ref, set } from "firebase/database";
import { selectUserEntity } from "../../redux/user/user.selectors";
import { nanoid } from "nanoid";

const ClaimForm: React.FC = () => {
  const [claim, setClaim] = useState({
    itemName: "",
    amountPaid: 0,
    date: "",
    category: "",
    additionalInfo: "",
  });
  const [claimErrors, setClaimErrors] = useState<ClaimErrors>({});

  // GLOBAL STATE
  const user = useAppSelector(selectUserEntity);
  const dispatch = useAppDispatch();

  const handleInputAndSelect = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    setClaim({ ...claim, [name]: value });
  };

  const handleSubmitClaim = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate input fields
    const errors: ClaimErrors = {};
    const claimSchema = schemaFactory(errors);

    try {
      await claimSchema.validate(
        { ...claim, amountPaid: +claim.amountPaid },
        { abortEarly: false }
      );
      setClaimErrors({});

      // Create id for the entry
      const entryId = nanoid();

      // Write to db
      set(ref(db, `/entries/${user?.userID}/${entryId}`), {
        ...claim,
        date: new Date(claim.date).getTime() + 86400000,
        amountPaid: +claim.amountPaid,
        id: entryId,
      });

      // ENTRY FORMAT
      // {
      // uuid: {
      // id: string
      // itemName: string
      // amountPaid: number
      // dateStamp: number
      // category: string
      // additionalInfo: string
      // }
      // }

      // Display the popup
      dispatch(
        updatePopup({
          isError: false,
          isPopupActive: true,
          message: "✅ Claim successfully added",
        })
      );

      // Clear input fields
      setClaim({
        itemName: "",
        amountPaid: 0,
        date: "",
        category: "",
        additionalInfo: "",
      });
    } catch (err) {
      // Render errors
      setClaimErrors(errors);
      dispatch(
        updatePopup({
          isError: true,
          isPopupActive: true,
          message: "💥 Please fix the errors above",
        })
      );
      // Render popup
    }
  };

  return (
    <ClaimFormContainer>
      <InputContainer>
        <Label htmlFor="itemName">
          <RequiredStar>*</RequiredStar> Name of the item:
        </Label>
        <Input
          value={claim.itemName}
          type="text"
          id="itemName"
          name="itemName"
          onChange={handleInputAndSelect}
          isError={claimErrors.itemName}
        />
        {claimErrors.itemName && (
          <ErrorMessage data-cy="itemNameError">
            {claimErrors.itemName}
          </ErrorMessage>
        )}
      </InputContainer>
      <InputContainer>
        <Label htmlFor="amountPaid">
          <RequiredStar>*</RequiredStar> Amount paid:
        </Label>
        <Input
          value={claim.amountPaid}
          type="number"
          id="amountPaid"
          name="amountPaid"
          min={0}
          onChange={handleInputAndSelect}
          isError={claimErrors.amountPaid}
        />
        {claimErrors.amountPaid && (
          <ErrorMessage data-cy="amountPaidError">
            {claimErrors.amountPaid}
          </ErrorMessage>
        )}
      </InputContainer>
      <InputContainer>
        <Label htmlFor="date">
          <RequiredStar>*</RequiredStar> Date:
        </Label>
        <Input
          value={claim.date}
          type="date"
          id="date"
          name="date"
          onChange={handleInputAndSelect}
          isError={claimErrors.date}
        />
        {claimErrors.date && (
          <ErrorMessage data-cy="dateError">{claimErrors.date}</ErrorMessage>
        )}
      </InputContainer>
      <InputContainer>
        <Label htmlFor="category">
          <RequiredStar>*</RequiredStar> Category:
        </Label>
        <Select
          value={claim.category}
          name="category"
          id="category"
          onChange={handleInputAndSelect}
          isError={claimErrors.itemName}
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
        </Select>
        {claimErrors.category && (
          <ErrorMessage data-cy="categoryError">
            {claimErrors.category}
          </ErrorMessage>
        )}
      </InputContainer>
      <InputContainer>
        <Label htmlFor="additionalInfo">Additional information</Label>
        <Textarea
          value={claim.additionalInfo}
          id="additionalInfo"
          name="additionalInfo"
          onChange={handleInputAndSelect}
        ></Textarea>
      </InputContainer>

      <PrimaryButton onClick={handleSubmitClaim}>Submit</PrimaryButton>
    </ClaimFormContainer>
  );
};

export default ClaimForm;
