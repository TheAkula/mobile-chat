import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { User } from "src/generated/graphql";

export const $users = createStore<Partial<User>[]>([]);
export const $usersLoading = createStore(false);
export const $usersError = createStore<Error | null>(null);
export const $usersNextPage = createStore(0);

export const $usersStore = combine({
  users: $users,
  usersLoading: $usersLoading,
  usersError: $usersError,
  usersNextPage: $usersNextPage,
});

export const useUsersStore = () => useStore($usersStore);
