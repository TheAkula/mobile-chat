import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  UpdateProfileDocument,
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
  MyInfoDocument,
  MyInfoQuery,
  ActivateMutation,
  ActivateDocument,
  GoOutMutation,
  GoOutDocument,
} from "src/generated/graphql";

export const fetchUserInfoFX = createEffect(async () => {
  return apolloClient.query<MyInfoQuery>({
    query: MyInfoDocument,
  });
});

export const updateProfileFx = createEffect(
  async (variables: UpdateProfileMutationVariables) => {
    return apolloClient.mutate<UpdateProfileMutation>({
      mutation: UpdateProfileDocument,
      variables,
    });
  }
);

export const activateFx = createEffect(() => {
  return apolloClient.mutate<ActivateMutation>({
    mutation: ActivateDocument,
  });
});

export const goOutFx = createEffect(() => {
  return apolloClient.mutate<GoOutMutation>({
    mutation: GoOutDocument,
  });
});

export const useFetchUserInfo = () => useUnit(fetchUserInfoFX);
export const useUpdateProfile = () => useUnit(updateProfileFx);
export const useGoOut = () => useUnit(goOutFx);
export const useActivate = () => useUnit(activateFx);
