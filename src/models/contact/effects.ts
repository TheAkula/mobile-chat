import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  UserInfoDocument,
  UserInfoQuery,
  UserInfoQueryVariables,
} from "src/generated/graphql";

export const fetchContactInfoFx = createEffect(
  (variables: UserInfoQueryVariables) => {
    return apolloClient.query<UserInfoQuery>({
      query: UserInfoDocument,
      variables,
    });
  }
);

export const useFetchContactInfo = () => useUnit(fetchContactInfoFx);
