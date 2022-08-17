import * as yup from "yup";

export const authPhone = yup.object({
  email: yup.string().email().trim().required(),
});
