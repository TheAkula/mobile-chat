import * as yup from "yup";

export const authEmail = yup.object({
  email: yup.string().email().trim().required(),
});
