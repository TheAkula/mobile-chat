import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { User } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const $contact = createStore<Partial<User>>({});

export const $contactLoading = createStore(false);

export const $contactError = createStore<Error | null>(null);

export const $contactStore = combine({
  contact: $contact,
  contactLoading: $contactLoading,
  contactError: $contactError,
});

export const useContactStore = () => useStore($contactStore);
