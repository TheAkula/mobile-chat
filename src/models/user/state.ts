import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { User } from "src/generated/graphql";

export const $user = createStore<Partial<User> | null>(null);
export const $userLoading = createStore(false);
export const $userError = createStore<Error | null>(null);
export const $userStore = combine({ $user, $userLoading, $userError });

export const useUserStore = () => useStore($userStore);
