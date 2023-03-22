import React from "react";
import {
  Input,
  InputContainer,
  Label,
  PrimaryButton,
  RequiredStar,
  Select,
  Textarea,
} from "../../global";
import { ClaimFormContainer } from "./claim-form.styles";

const ClaimForm: React.FC = () => {
  return (
    <ClaimFormContainer>
      <InputContainer>
        <Label htmlFor="itemName">
          <RequiredStar>*</RequiredStar> Name of the item:
        </Label>
        <Input type="text" id="itemName" name="itemName" />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="amountPaid">
          <RequiredStar>*</RequiredStar> Amount paid:
        </Label>
        <Input type="number" id="amountPaid" name="amountPaid" min={0} />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="date">
          <RequiredStar>*</RequiredStar> Date:
        </Label>
        <Input type="date" id="date" name="date" />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="category">
          <RequiredStar>*</RequiredStar> Category:
        </Label>
        <Select name="category" id="category">
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
      </InputContainer>
      <InputContainer>
        <Label htmlFor="additionalInfo">Additional information</Label>
        <Textarea id="additionalInfo" name="additionalInfo"></Textarea>
      </InputContainer>

      <PrimaryButton>Submit</PrimaryButton>
    </ClaimFormContainer>
  );
};

export default ClaimForm;
