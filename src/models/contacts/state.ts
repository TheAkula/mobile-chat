import { createStore } from "effector";
import { User } from "src/generated/graphql";

export const $myContacts = createStore<Partial<User>[]>([]);
export const $myContactsLoading = createStore(false);
