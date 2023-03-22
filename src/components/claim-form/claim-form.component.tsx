import React, { useState } from "react";
import { number, object, string } from "yup";
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
import { ClaimErrors } from "../../utils/interfaces";
import { ClaimFormContainer } from "./claim-form.styles";

const ClaimForm: React.FC = () => {
  const [claim, setClaim] = useState({
    itemName: "",
    amountPaid: 0,
    date: "",
    category: "",
    additionalInfo: "",
  });
  const [claimErrors, setClaimErrors] = useState<ClaimErrors>({});

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
    const claimSchema = object({
      itemName: string().required(() => {
        errors.itemName = "Item name is required";
      }),
      amountPaid: number().moreThan(0, () => {
        errors.amountPaid = "Amount paid must be a positive number";
      }),
      date: string().required(() => {
        errors.date = "Date must be selected";
      }),
      category: string().required(() => {
        errors.category = "Category must be selected";
      }),
    });

    try {
      await claimSchema.validate(claim, { abortEarly: false });
      setClaimErrors({});

      // Write to db

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
          <ErrorMessage>{claimErrors.itemName}</ErrorMessage>
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
          <ErrorMessage>{claimErrors.amountPaid}</ErrorMessage>
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
        {claimErrors.date && <ErrorMessage>{claimErrors.date}</ErrorMessage>}
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
          <ErrorMessage>{claimErrors.category}</ErrorMessage>
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
