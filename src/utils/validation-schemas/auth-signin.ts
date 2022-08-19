import * as yup from "yup";

export const authSignin = yup.object({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().required(),
});
