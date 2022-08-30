import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  UpdateProfileDocument,
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
  MyInfoDocument,
  MyInfoQuery,
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

export const useFetchUserInfo = () => useUnit(fetchUserInfoFX);
export const useUpdateProfile = () => useUnit(updateProfileFx);
