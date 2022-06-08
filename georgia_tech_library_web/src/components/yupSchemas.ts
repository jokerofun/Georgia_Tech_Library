import * as yup from "yup";

export const cardSchema = yup.object({
  cardNumber: yup
    .string()
    .required()
    .min(12, "Card number must be exactly 12 characters long")
    .max(12),
  dateOfIssue: yup.date().required(),
  expirationDay: yup.date().required(),
});

export type FormCard = yup.Asserts<typeof cardSchema>;
