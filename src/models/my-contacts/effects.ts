import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  AddContactDocument,
  AddContactMutation,
  AddContactMutationVariables,
  ContactsDocument,
  ContactsQuery,
  RemoveContactDocument,
  RemoveContactMutation,
  RemoveContactMutationVariables,
} from "src/generated/graphql";

export const fetchMyContactsFx = createEffect(async () => {
  return apolloClient.query<ContactsQuery>({
    query: ContactsDocument,
  });
});

export const addMyContactFx = createEffect(
  async (variables: AddContactMutationVariables) => {
    return apolloClient.mutate<AddContactMutation>({
      mutation: AddContactDocument,
      variables,
    });
  }
);

export const removeContactFx = createEffect(
  async (variables: RemoveContactMutationVariables) => {
    return apolloClient.mutate<RemoveContactMutation>({
      mutation: RemoveContactDocument,
      variables,
    });
  }
);

export const useFetchMyContacts = () => useUnit(fetchMyContactsFx);
export const useAddMyContact = () => useUnit(addMyContactFx);
export const useRemoveContact = () => useUnit(removeContactFx);
