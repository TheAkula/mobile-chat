import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { Auth } from "src/types";

export const $auth = createStore<Auth>({});
export const $authLoading = createStore(false);
export const $authError = createStore<Error | null>(null);

export const $authStore = combine({
  auth: $auth,
  authLoading: $authLoading,
  error: $authError,
});

export const useAuthStore = () => useStore($authStore);
