import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { User } from "src/generated/graphql";

export const $myContacts = createStore<Partial<User>[]>([]);
export const $myContactsLoading = createStore(false);
export const $myContactsError = createStore<Error | null>(null);

export const $myContactsStore = combine({
  myContacts: $myContacts,
  myContactsLoading: $myContactsLoading,
  myContactsError: $myContactsError,
});

export const useMyContactsStore = () => useStore($myContactsStore);
