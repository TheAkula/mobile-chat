import * as yup from "yup";

export const chatsAdd = yup.object({
  name: yup.string().required().trim(),
});
