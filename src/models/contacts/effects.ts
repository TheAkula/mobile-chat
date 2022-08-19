import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import { ContactsDocument, ContactsQuery } from "src/generated/graphql";

export const fetchMyContactsFx = createEffect(async () => {
  return apolloClient.query<ContactsQuery>({
    query: ContactsDocument,
  });
});

export const useFetchMyContacts = () => useUnit(fetchMyContactsFx);
