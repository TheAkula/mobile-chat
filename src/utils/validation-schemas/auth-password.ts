import * as yup from "yup";

export const authPassword = yup.object({
  password: yup.string().trim().min(6).required(),
});
