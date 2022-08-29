import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  UsersQuery,
  UsersDocument,
  UsersQueryVariables,
} from "src/generated/graphql";

export const fetchUsersFx = createEffect((variables?: UsersQueryVariables) => {
  return apolloClient.query<UsersQuery>({
    query: UsersDocument,
    variables,
  });
});

export const fetchMoreUsersFx = createEffect(
  (variables?: UsersQueryVariables) => {
    return apolloClient
      .watchQuery<UsersQuery>({
        query: UsersDocument,
      })
      .fetchMore<UsersQuery>({
        variables,
      });
  }
);

export const useFetchUsers = () => useUnit(fetchUsersFx);
export const useFetchMoreUsers = () => useUnit(fetchMoreUsersFx);
