import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import { ContactsDocument, ContactsQuery } from "src/generated/graphql";

export const myContactsFx = createEffect(async () => {
  return apolloClient.query<ContactsQuery>({
    query: ContactsDocument,
  });
});

export const useMyContacts = () => useUnit(myContactsFx);
