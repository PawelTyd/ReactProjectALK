import { object, string } from "yup";

export const ValidationSchema = object().shape({
  email: string().email().required(),
});
