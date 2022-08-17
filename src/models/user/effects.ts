import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  CreateProfileDocument,
  CreateProfileMutation,
  CreateProfileMutationResult,
  CreateProfileMutationVariables,
  MyInfoDocument,
  MyInfoQuery,
  MyInfoQueryResult,
} from "src/generated/graphql";

export const fetchUserInfoFX = createEffect(async () => {
  return apolloClient.query<MyInfoQuery>({
    query: MyInfoDocument,
  });
});

export const updateProfileFx = createEffect(
  async (variables: CreateProfileMutationVariables) => {
    return apolloClient.mutate<CreateProfileMutation>({
      mutation: CreateProfileDocument,
      variables,
    });
  }
);
export const useFetchUserInfo = () => useUnit(fetchUserInfoFX);
export const useUpdateProfile = () => useUnit(updateProfileFx);
