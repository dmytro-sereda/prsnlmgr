import { number, object, string } from "yup";
import { ClaimErrors } from "./interfaces";

export const schemaFactory = (errors: ClaimErrors) => {
  return object({
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
};
