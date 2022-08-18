import * as yup from "yup";

export const authProfile = yup.object({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim(),
});
