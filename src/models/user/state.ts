import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { User } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const $user = createStore<DeepPartial<User> | null>(null);
export const $userLoading = createStore(false);
export const $userError = createStore<Error | null>(null);
export const $userStore = combine({
  user: $user,
  userLoading: $userLoading,
  userError: $userError,
});

export const useUserStore = () => useStore($userStore);
export const useUser = () => useStore($user);
