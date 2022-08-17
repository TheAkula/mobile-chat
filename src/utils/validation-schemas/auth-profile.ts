import * as yup from "yup";

export const authProfile = yup.object({
  img: yup.string(),
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim(),
});
