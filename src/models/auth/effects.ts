import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import { AsyncStorageKey } from "src/constants";
import {
  ConfirmSignUpWith2faDocument,
  ConfirmSignUpWith2faMutation,
  ConfirmSignUpWith2faMutationVariables,
  SignUpWith2faDocument,
  SignUpWith2faMutation,
  SignUpWith2faMutationVariables,
  SigninDocument,
  SigninMutation,
  SigninMutationVariables,
} from "src/generated/graphql";

export const signupWith2faFx = createEffect(
  async (variables: SignUpWith2faMutationVariables) => {
    return apolloClient.mutate<SignUpWith2faMutation>({
      mutation: SignUpWith2faDocument,
      variables,
    });
  }
);

export const confirmSignupWith2faFx = createEffect(
  async (variables: ConfirmSignUpWith2faMutationVariables) => {
    return apolloClient.mutate<ConfirmSignUpWith2faMutation>({
      mutation: ConfirmSignUpWith2faDocument,
      variables,
    });
  }
);

export const signinFx = createEffect(
  async (variables: SigninMutationVariables) => {
    return apolloClient.mutate<SigninMutation>({
      mutation: SigninDocument,
      variables,
    });
  }
);

export const setTokenFx = createEffect(async (token: string) => {
  await AsyncStorage.setItem(AsyncStorageKey.USER_TOKEN, token);
});

export const useSignupWith2fa = () => useUnit(signupWith2faFx);
export const useConfirmSignupWith2fa = () => useUnit(confirmSignupWith2faFx);
export const useSignin = () => useUnit(signinFx);

export const useSetToken = () => useUnit(setTokenFx);
