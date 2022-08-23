import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { User } from "src/generated/graphql";

export const $users = createStore<Partial<User>[]>([]);
export const $usersLoading = createStore(false);
export const $usersError = createStore<Error | null>(null);

export const $usersStore = combine({
  users: $users,
  usersLoading: $usersLoading,
  usersError: $usersError,
});

export const useUsersStore = () => useStore($usersStore);
