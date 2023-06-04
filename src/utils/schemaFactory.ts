import { number, object, string } from "yup";

export const schemaFactory = () => {
  return object({
    itemName: string().required("Item name is required"),
    amountPaid: number().moreThan(0, "Amount paid must be a positive number"),
    date: string().required("Date must be selected"),
    category: string().required("Category must be selected"),
  });
};
